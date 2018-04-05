import _cloneDeep from 'lodash/cloneDeep';

export const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
const GENOCIDE = 'TOGGLE_GENOCIDE';
const LIFE_EVERYWHERE = 'LIFE_EVERYWHERE';
const CREATE_RECTANGLE_WORLD = 'CREATE_RECTANGLE_WORLD';
const CREATE_HEXA_WORLD = 'CREATE_HEXA_WORLD';
export const ALIVE = true;
export const DEAD = false;

export const createWorld = (rows, cols, defaultStatus) => ({
  type: CREATE_RECTANGLE_WORLD,
  rows,
  cols,
  defaultStatus,
});

export const computeNextState = { type: COMPUTE_NEXT_STATE };
export const toggleStatus = (x, y) => ({
  type: TOGGLE_CELL_STATUS,
  x,
  y,
});

export const lifeEverywhere = { type: LIFE_EVERYWHERE };
export const killThemAll = { type: GENOCIDE };

const cellID = (x, y) => `${x},${y}`;

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
      nextState[y][x] = !nextState[y][x];
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

export const createHexaWorld = (baseSize, status) => ({ // FIXME remove this action creator
  type: CREATE_HEXA_WORLD,
  baseSize,
  status
});

export function hexagonalCellsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
      const generateStatus = () => action.defaultStatus !== undefined
        ? action.defaultStatus
        : getRandomStatus();

      const newWorld = [];
      for (let y = 0; y < action.rows; y++) {
        const row = [];
        newWorld.push(row);
        for (let x = 0; x < action.cols; x++) {
          row.push(generateStatus());
        }
      }
      return newWorld;
    case COMPUTE_NEXT_STATE:
      const nextWorldState = [];
      for (let y = 0; y < state.length; y++) {
        const row = [];
        nextWorldState.push(row);
        for (let x = 0; x < state[y].length; x++) {
          const offsetX = y % 2 === 1 ? 0 : -1;
          const currentCellState = state[y][x];
          const upLeft = y > 0 && state[y - 1][x + offsetX];
          const upRight = y > 0 && state[y - 1][x + 1 + offsetX];
          const left = state[y][x - 1];
          const right = state[y][x+1];
          const downLeft = y < state.length - 1 && state[y+1][x + offsetX];
          const downRight = y < state.length - 1 && state[y+1][x+1 + offsetX];
          row.push(nextCellStatus(currentCellState, [
              upLeft,
              upRight,
              left,
              right,
              downLeft,
              downRight,
            ]));
        }
      }
      return nextWorldState; // TODO :factorize processing with CREATE_RECTANGLE_WORLD
    default:
      return state;
  }
}