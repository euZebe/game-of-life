import { combineReducers } from 'redux';
import { cellReducer } from './cell-duck';

const rootReducer = combineReducers({
  cells: cellReducer
});

export default rootReducer;