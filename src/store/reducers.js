import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import undoable from 'redux-undo';
import {
  cellsTableReducer,
  hexagonalCellsReducer,
  iterationNumberReducer,
  shapeReducer,
} from './cell-duck';
import playOptionsReducer from './playOptions';

export const getTableOfCellsSelector = state => state.cellsTable.present;
export const getHoneyCombSelector = state => state.hexaCells.present;
export const getPastHoneyCombSelector = state => state.hexaCells.past;
export const getFutureHoneyCombSelector = state => state.hexaCells.future;
export const honeyCombAsSingleArraySelector = createSelector(
  getHoneyCombSelector,
  arrayOfRows => [].concat.apply([], arrayOfRows),
);
export const areThereCells = createSelector(
  getTableOfCellsSelector,
  honeyCombAsSingleArraySelector,
  (table, honeycomb) => table.length > 0 || honeycomb.length > 0
);
export const getShapeSelector = state => state.shape;
export const getCurrentShape = state => getShapeSelector(state).shape;
export const iterationNumberSelector = state => state.iterationNumber.present;

export function playOptionsSelector(state) {
  return state.playOptions;
}

const rootReducer = combineReducers({
  cellsTable: undoable(cellsTableReducer),
  hexaCells: undoable(hexagonalCellsReducer),
  iterationNumber: undoable(iterationNumberReducer),
  shape: shapeReducer,
  playOptions: playOptionsReducer,
});


export default rootReducer;