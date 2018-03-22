import shortid from 'shortid';

const ADD_CELL = 'ADD_CELL';
const COMPUTE_NEXT_STATE = 'COMPUTE_NEXT_STATE';
const TOGGLE_CELL_STATE = 'TOGGLE_CELL_STATE';
export const ALIVE = 'alive';
export const DEAD = 'dead';

export const addCell = (cellStatus = false) => ({
  type: ADD_CELL,
  cellStatus
});
export const computeNextState = () => ({ type: COMPUTE_NEXT_STATE });
export const toggleStatus = (id) => ({
  type: TOGGLE_CELL_STATE,
  id
});

export function nextState(cell = {}) {
  return cell.neighbours
    && (cell.status === ALIVE && cell.neighbours.length === 2 || cell.neighbours.length === 3)
      ? ALIVE
      : DEAD;
}


export function cellReducer(state = {}, action) {
  switch(action.type) {
    case ADD_CELL:
      const id = shortid.generate();
      return {
        ...state,
        [id]: {
          id,
          status: action.cellStatus
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
    case TOGGLE_CELL_STATE:
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