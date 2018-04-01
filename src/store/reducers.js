import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import reduceReducers from 'reduce-reducers';
import {
  cellsByIdReducer,
  iterationNumberReducer
} from './cell-duck';

export const cellsByIdSelector = state => state.cellsById;

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

const rootReducer = reduceReducers(
  combineReducers({
    cellsById: cellsByIdReducer,
    iterationNumber: iterationNumberReducer,
  }),
);

export default rootReducer;