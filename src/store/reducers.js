import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import reduceReducers from 'reduce-reducers';
import { cellsByIdReducer, cellsByPositionReducer } from './cell-duck';
import { updateNeighboursReducer } from './neighbours-duck';

export const cellsByIdSelector = state => state.cellsById;
export const cellsByPositionSelector = state => state.cellsByPosition;
export const worldHeight = state => state.world.height;
export const worldWidth = state => state.world.width;

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
    cellsByPosition: cellsByPositionReducer,
  }),
  updateNeighboursReducer,
);

export default rootReducer;