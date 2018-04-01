import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  cellsTableReducer,
  iterationNumberReducer
} from './cell-duck';

export const tableOfCellsSelector = state => state.cellsTable;

const rootReducer = reduceReducers(
  combineReducers({
    cellsTable: cellsTableReducer,
    iterationNumber: iterationNumberReducer,
  }),
);

export default rootReducer;