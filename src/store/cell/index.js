import shortid from 'shortid';

const ADD_CELL = 'ADD_CELL';
export const ALIVE = 'alive';
export const DEAD = 'dead';

export const addCell = (cellState = false) => ({
  type: ADD_CELL,
  cellState
});

export function cellReducer(state = {}, action) {
  switch(action.type) {
    case ADD_CELL:
      const id = shortid.generate();
      return {
        ...state,
        [id]: {
          id,
          state: action.cellState
        }
      };
    default:
      return state;
  }
}