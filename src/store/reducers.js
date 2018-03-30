import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import reduceReducers from 'reduce-reducers';
import {
  ADD_CELL,
  cellsByIdReducer,
  cellsByPositionReducer,
  iterationNumberReducer
} from './cell-duck';
import { updateNeighboursReducer, UPDATE_NEIGHBOURS } from './neighbours-duck';

export const cellsByIdSelector = state => state.cellsById;
export const cellsIDByPositionSelector = state => state.cellsByPosition;

export const tableOfCellsSelector = createSelector(
  cellsByIdSelector,
  (cells) => {
    return Object.values(cells).reduce((aggregator, cell) => {
        const { x, y } = cell.position;
        if (!aggregator[y]) {
          aggregator[y] = {};
        }
        aggregator[y][x] = cell;
        return aggregator;
      }
      , {});
  }
);


const chronoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CELL:
      return {
        ...state,
        startAddingCells: state.startAddingCells || new Date(),
        lastCellAdd: new Date(),
      };
    case UPDATE_NEIGHBOURS:
      return {
        ...state,
        startComputingNeighbours: state.startComputingNeighbours || new Date(),
      };
    default:
      return state;
  }
}

const rootReducer = reduceReducers(
  combineReducers({
    cellsById: cellsByIdReducer,
    cellsByPosition: cellsByPositionReducer,
    iterationNumber: iterationNumberReducer,
    chrono: chronoReducer,
  }),
  updateNeighboursReducer,
);

export default rootReducer;