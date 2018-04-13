import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import undoable from 'redux-undo';
import {
  cellsTableReducer,
  hexagonalCellsReducer,
  iterationNumberReducer,
  shapeReducer,
} from './cell-duck';

export const getTableOfCellsSelector = state => state.cellsTable.present;
export const getHoneyCombSelector = state => state.hexaCells.present;
export const honeyCombAsSingleArraySelector = createSelector(
  getHoneyCombSelector,
  arrayOfRows => [].concat.apply([], arrayOfRows),
);
export const getShapeSelector = state => state.shape;
export const iterationNumberSelector = state => state.iterationNumber.present;

const rootReducer = combineReducers({
  cellsTable: undoable(cellsTableReducer),
  hexaCells: undoable(hexagonalCellsReducer),
  iterationNumber: undoable(iterationNumberReducer),
  shape: shapeReducer,
});


export default rootReducer;