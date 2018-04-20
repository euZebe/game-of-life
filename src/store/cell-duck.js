import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import { HEXAGON, RECTANGLE } from '../model/shapes';

export const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
const GENOCIDE = 'TOGGLE_GENOCIDE';
const LIFE_EVERYWHERE = 'LIFE_EVERYWHERE';
export const CREATE_RECTANGLE_WORLD = 'CREATE_RECTANGLE_WORLD';
export const CREATE_HEXA_WORLD = 'CREATE_HEXA_WORLD';
export const ALIVE = true;
export const DEAD = false;
export const StatusType = PropTypes.bool;

export const createWorld = (shape, rows, cols, defaultStatus) => ({
  type: shape === RECTANGLE.value ? CREATE_RECTANGLE_WORLD : CREATE_HEXA_WORLD,
  rows,
  cols,
  defaultStatus,
});

export const computeNextState = { type: COMPUTE_NEXT_STATE };

export const toggleStatus = (x, y, status) => ({
  type: TOGGLE_CELL_STATUS,
  x,
  y,
  status,
});

export const lifeEverywhere = { type: LIFE_EVERYWHERE };
export const killThemAll = { type: GENOCIDE };

export function iterationNumberReducer(iterationNumber = 0, action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
    case CREATE_HEXA_WORLD:
      return 0;
    case COMPUTE_NEXT_STATE:
      return iterationNumber + 1;
    default:
      return iterationNumber;
  }
}

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
    case CREATE_HEXA_WORLD:
      return [];
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
      if (state.length === 0) return state;
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
      if (state.length === 0) return state;
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

export function hexagonalCellsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD:
      return [];
    case CREATE_HEXA_WORLD:
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
      if (state.length === 0) return state;
      const nextWorldState = [];
      for (let y = 0; y < state.length; y++) {
        const row = [];
        nextWorldState.push(row);
        for (let x = 0; x < state[y].length; x++) {
          const offsetX = y % 2 === 1 ? 0 : -1;
          const currentCellState = state[y][x];
          row.push(nextCellStatus(currentCellState, [
            y > 0 && state[y - 1][x + offsetX],
            y > 0 && state[y - 1][x + 1 + offsetX],
            state[y][x - 1],
            state[y][x + 1],
            y < state.length - 1 && state[y + 1][x + offsetX],
            y < state.length - 1 && state[y + 1][x + 1 + offsetX],
          ]));
        }
      }
      return nextWorldState; // TODO :factorize processing with CREATE_RECTANGLE_WORLD

    case GENOCIDE:
      return switchAllCellsToStatus(state, DEAD);
    case LIFE_EVERYWHERE:
      return switchAllCellsToStatus(state, ALIVE);

    case TOGGLE_CELL_STATUS:
      if (state.length === 0) return state;
      const { x, y } = action;
      const nextState = _cloneDeep(state);
      nextState[y][x] = action.status || !nextState[y][x];
      return nextState;
    default:
      return state;
  }
}

export function shapeReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_RECTANGLE_WORLD: {
      const { cols, rows } = action;
      return {
        shape: RECTANGLE.value,
        cols,
        rows,
      };
    }
    case CREATE_HEXA_WORLD: {
      const { cols, rows } = action;
      return {
        shape: HEXAGON.value,
        cols,
        rows,
      };
    }
    default:
      return state;
  }
}