export const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
const GENOCIDE = 'TOGGLE_GENOCIDE';
const LIFE_EVERYWHERE = 'LIFE_EVERYWHERE';
const CREATE_WORLD = 'CREATE_WORLD';
export const ALIVE = 'alive';
export const DEAD = 'dead';

export const createWorld = (rows, cols) => ({
  type: CREATE_WORLD,
  rows,
  cols,
});

export const computeNextState = { type: COMPUTE_NEXT_STATE };
export const toggleStatus = (id) => ({
  type: TOGGLE_CELL_STATUS,
  id
});

export function nextState(cell = {}, neighbours) {
  const aliveNeighbours = neighbours.filter(n => n.status === ALIVE);
  return aliveNeighbours
  && ((cell.status === ALIVE && aliveNeighbours.length === 2) || aliveNeighbours.length === 3)
    ? ALIVE
    : DEAD;
}

export const lifeEverywhere = { type: LIFE_EVERYWHERE };
export const killThemAll = { type: GENOCIDE };

function allCellsWithSameStatus(state, status) {
  return Object.values(state)
    .reduce((aggregator, cell) => ({
      ...aggregator,
      [cell.id]: { ...cell, status },
    }), {});
}

const cellID = (x, y) => `${x},${y}`;

export function cellsByIdReducer(cellsByID = {}, action) {
  switch (action.type) {

    case CREATE_WORLD:
      const result = {};
      for (let y = 0; y < action.rows; y++) {
        for (let x = 0; x < action.cols; x++) {
          const id = cellID(x, y);
          result[id] = {
            id,
            status: Math.random() < 0.4 ? ALIVE : DEAD,
            position: { x, y },
            neighboursIDs: [ // TODO: factorize checks
              x > 0 && y > 0 && cellID(x - 1, y - 1),
              y > 0 && cellID(x, y - 1),
              x < action.rows - 1 && y > 0 && cellID(x + 1, y - 1),
              x > 0 && cellID(x - 1, y),
              x < action.rows - 1 && cellID(x + 1, y),
              x > 0 && y < action.cols - 1 && cellID(x - 1, y + 1),
              cellID(x, y + 1),
              x < action.rows - 1 && y < action.cols - 1 && cellID(x + 1, y + 1),
            ],
          };
        }
      }
      return result;

    case COMPUTE_NEXT_STATE:
      return Object.entries(cellsByID).reduce((aggregator, [id, cell]) => {
          return {
            ...aggregator,
            [id]: {
              ...cell,
              status: nextState(cell, cellsSelector(cellsByID, cell.neighboursIDs)),
            },
          }
        }
        , {});

    case TOGGLE_CELL_STATUS:
      return {
        ...cellsByID,
        [action.id]: {
          ...cellsByID[action.id],
          status: cellsByID[action.id].status === ALIVE ? DEAD : ALIVE
        }
      };

    case GENOCIDE:
      return allCellsWithSameStatus(cellsByID, DEAD);
    case LIFE_EVERYWHERE:
      return allCellsWithSameStatus(cellsByID, ALIVE);
    default:
      return cellsByID;
  }
}

export const cellsSelector = (cellsById, ids) => {
  return ids.map(id => cellsById[id]).filter(n => n);
}

export function iterationNumberReducer(iterationNumber = 0, action) {
  switch (action.type) {
    case CREATE_WORLD:
      return 0;
    case COMPUTE_NEXT_STATE:
      return iterationNumber + 1;
    default:
      return iterationNumber;
  }
}

export const iterationNumberSelector = state => state.iterationNumber;