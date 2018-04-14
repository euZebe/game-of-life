import { createStore, combineReducers } from 'redux';
import { createDevTools } from 'redux-devtools';
import { cellsTableReducer, hexagonalCellsReducer } from '../store/cell-duck';

const reducer = combineReducers({
  cellsTable: cellsTableReducer,
  hexaCells: hexagonalCellsReducer,
});

export default function(initialState) {
  const store = createStore(reducer, initialState, createDevTools());
  return store;
}