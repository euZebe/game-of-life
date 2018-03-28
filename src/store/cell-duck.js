import shortid from 'shortid';

const ADD_CELL = 'ADD_CELL';
const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
export const ALIVE = 'alive';
export const DEAD = 'dead';

let id = 0;

export const addCell = (cellStatus, position) => ({
  type: ADD_CELL,
  cellStatus,
  position,
  id: ++id,
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

export function cellsByIdReducer(state = {}, action) {
  switch (action.type) {

    case ADD_CELL:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          status: action.cellStatus,
          position: action.position,
        }
      };

    case COMPUTE_NEXT_STATE:
      return Object.entries(state).reduce((aggregator, [id, cell]) => {
          return {
            ...aggregator,
            [id]: {
              ...cell,
              status: nextState(cell, cellsByPositionSelector(state, cell.neighboursIDs)),
            },
          }
        }
      , {});

    case
    TOGGLE_CELL_STATUS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          status: state[action.id].status === ALIVE ? DEAD : ALIVE
        }
      };
    default:
      return state;
  }
}

export const cellsByPositionSelector = (cellsById, ids) => {
  return ids.map(id => cellsById[id]);
}

export function cellsByPositionReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CELL:
      const { x, y } = action.position;
      return {
        ...state,
        [`${x},${y}`]: action.id,
      };
    default:
      return state;
  }
}