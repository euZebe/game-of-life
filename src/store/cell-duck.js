import _cloneDeep from 'lodash/cloneDeep';

export const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
const GENOCIDE = 'TOGGLE_GENOCIDE';
const LIFE_EVERYWHERE = 'LIFE_EVERYWHERE';
const CREATE_RECTANGLE_WORLD = 'CREATE_RECTANGLE_WORLD';
const CREATE_HEXA_WORLD = 'CREATE_HEXA_WORLD';
export const ALIVE = 'alive';
export const DEAD = 'dead';

export const createWorld = (rows, cols) => ({
  type: CREATE_RECTANGLE_WORLD,
  rows,
  cols,
});

export const computeNextState = { type: COMPUTE_NEXT_STATE };
export const toggleStatus = (x, y) => ({
  type: TOGGLE_CELL_STATUS,
  x,
  y,
});

export const lifeEverywhere = { type: LIFE_EVERYWHERE };
export const killThemAll = { type: GENOCIDE };

export function iterationNumberReducer(iterationNumber = 0, action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
      return 0;
    case COMPUTE_NEXT_STATE:
      return iterationNumber + 1;
    default:
      return iterationNumber;
  }
}

export const iterationNumberSelector = state => state.iterationNumber;

function switchAllCellsToStatus(state, cellStatus = DEAD) {
  const genocideState = new Array(state.length);
  let i = 0;
  for (; i < state.length; i++) {
    genocideState[i] = new Array(state[i].length).fill(cellStatus);
  }
  return genocideState;
}

function getRandomStatus() {
  return Math.random() < 0.4 ? ALIVE : DEAD;
}

export function cellsTableReducer(state = [], action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
      const newWorld = [];
      for (let y = 0; y < action.rows; y++) {
        const row = [];
        newWorld.push(row);
        for (let x = 0; x < action.cols; x++) {
          row.push(getRandomStatus());
        }
      }
      return newWorld;

    case GENOCIDE:
      return switchAllCellsToStatus(state, DEAD);

    case LIFE_EVERYWHERE:
      return switchAllCellsToStatus(state, ALIVE);

    case COMPUTE_NEXT_STATE:
      const nextWorldState = [];
      for (let y = 0; y < state.length; y++) {
        const row = [];
        nextWorldState.push(row);
        for (let x = 0; x < state[y].length; x++) {
          row.push(nextCellStatus(state[y][x], [
            y > 0 && state[y - 1][x - 1],
            state[y][x - 1],
            y < state.length - 1 && state[y + 1][x - 1],
            y > 0 && state[y - 1][x],
            y < state.length - 1 && state[y + 1][x],
            y > 0 && state[y - 1][x + 1],
            state[y][x + 1],
            y < state.length - 1 && state[y + 1][x + 1],
          ]));
        }
      }
      return nextWorldState; // TODO :factorize processing with CREATE_RECTANGLE_WORLD

    case TOGGLE_CELL_STATUS:
      const { x, y } = action;
      const nextState = _cloneDeep(state);
      nextState[y][x] = nextState[y][x] === ALIVE ? DEAD : ALIVE;
      return nextState;
    default:
      return state;
  }
}

function nextCellStatus(cellStatus, neighboursStatus) {
  const aliveNeighbours = neighboursStatus.filter(n => n === ALIVE);
  return aliveNeighbours
  && ((cellStatus === ALIVE && aliveNeighbours.length === 2) || aliveNeighbours.length === 3)
    ? ALIVE
    : DEAD;
}

export const createHexaWorld = (radius, status) => ({
  type: CREATE_HEXA_WORLD,
  radius,
  status
});

export function hexagonalCellsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_HEXA_WORLD:
      const world = [];
      const generateStatus = () => action.status !== undefined ? action.status : getRandomStatus();
      for (let y = 0; y < action.radius * 2 + 1; y++) {
        const newRow = [];
        world.push(newRow);
        if (y % 2 === 1) {
          newRow.push(generateStatus()); // add an element for odd rows
        }
        for (let x = 0; x < action.radius; x++) {
          newRow.push(generateStatus());
        }
      }
      return world;
    case COMPUTE_NEXT_STATE:
      const nextWorldState = [];
      for (let y = 0; y < state.length; y++) {
        const row = [];
        nextWorldState.push(row);
        for (let x = 0; x < state[y].length; x++) {
          const currentCellState = state[y][x];
          const neighbours = getNeighbours(x, y, state);
          const result = nextCellStatus(currentCellState, neighbours);
          row.push(result);
        }
      }
      return nextWorldState; // TODO :factorize processing with CREATE_RECTANGLE_WORLD ?
    default:
      return state;
  }
}

function getNeighbours(colNumber, rowNumber, state) {
  if (rowNumber % 2 === 1) {
    // neighbours for odd rows are at abs x and x+1 in upper and lower row
    return [
      rowNumber > 0 && state[rowNumber - 1][colNumber - 1],
      rowNumber > 0 && state[rowNumber - 1][colNumber],
      state[rowNumber][colNumber - 1],
      state[rowNumber][colNumber + 1],
      rowNumber < state.length - 1 && state[rowNumber + 1][colNumber - 1],
      rowNumber < state.length - 1 && state[rowNumber + 1][colNumber],
    ];
  }
  // neighbours for even rows are at abs x-1 and x in upper and lower row
  return [
    rowNumber > 0 && state[rowNumber - 1][colNumber],
    rowNumber > 0 && state[rowNumber - 1][colNumber + 1],
    state[rowNumber][colNumber - 1],
    state[rowNumber][colNumber + 1],
    rowNumber < state.length - 1 && state[rowNumber + 1][colNumber],
    rowNumber < state.length - 1 && state[rowNumber + 1][colNumber + 1],
  ];
}

export function shapeReducer(globalState, action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
      const { rows, cols } = action;
      return {
        ...globalState,
        hexaCells: [],
        shape: {
          label: 'rectangle',
          rows,
          cols,
        },
      };
    case CREATE_HEXA_WORLD:
      return {
        ...globalState,
        cellsTable: [],
        shape: { label: 'hexagon', radius: action.radius },
      }
    default:
      return globalState;
  }
}