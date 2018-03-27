import shortid from 'shortid';

const ADD_CELL = 'ADD_CELL';
const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATUS = 'TOGGLE_CELL_STATUS';
const UPDATE_NEIGHBOURS = 'UPDATE_NEIGHBOURS';
const UPDATE_NEIGHBOURS_FOR_CELL = 'UPDATE_NEIGHBOURS_FOR_CELL';
export const ALIVE = 'alive';
export const DEAD = 'dead';

export const addCell = (cellStatus, position) => ({
  type: ADD_CELL,
  cellStatus,
  position,
  id: shortid.generate(),
});
export const computeNextState = { type: COMPUTE_NEXT_STATE };
export const toggleStatus = (id) => ({
  type: TOGGLE_CELL_STATUS,
  id
});

export const updateNeighbours = cell => (cell ? {
  type: UPDATE_NEIGHBOURS_FOR_CELL, position: cell.position
} : {
  type: UPDATE_NEIGHBOURS
});


export function nextState(cell = {}) {
  return cell.neighbours
  && ((cell.status === ALIVE && cell.neighbours.length === 2) || cell.neighbours.length === 3)
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
      return Object.entries(state).reduce((aggregator, [id, value]) => ({
        ...aggregator,
        [id]: {
          ...value,
          status: nextState(value)
        },
      }));
    case UPDATE_NEIGHBOURS_FOR_CELL:
      return state; // TODO: implement this
    case TOGGLE_CELL_STATUS:
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

export function cellsByPositionReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CELL:
      const {x, y} = action.position;
      return {
        ...state,
        [`${x},${y}`]: action.id,
      };
    default:
      return state;
  }
}