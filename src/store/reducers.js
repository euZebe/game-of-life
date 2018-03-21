import { combineReducers } from 'redux';
import { cellReducer } from './cell';

const rootReducer = combineReducers({
  cells: cellReducer
});

export default rootReducer;