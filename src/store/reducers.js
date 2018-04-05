import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import {
  cellsTableReducer,
  hexagonalCellsReducer,
  iterationNumberReducer,
  shapeReducer,
} from './cell-duck';

export const tableOfCellsSelector = state => state.cellsTable;
const honeyCombSelector = state => state.hexaCells;
export const honeyCombAsSingleArraySelector = createSelector(
  honeyCombSelector,
  arrayOfRows => [].concat.apply([], arrayOfRows),
);

const rootReducer = combineReducers({
  cellsTable: cellsTableReducer,
  hexaCells: hexagonalCellsReducer,
  iterationNumber: iterationNumberReducer,
  shape: shapeReducer,
});


export default rootReducer;