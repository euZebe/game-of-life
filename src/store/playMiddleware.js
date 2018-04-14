import { getIsPlaying, play } from './playOptions';

export default ({ getState, dispatch }) => next => action => {
  if (getIsPlaying(getState()) && action.type.match(/^CREATE_\w*_WORLD$/)) {
    dispatch(play());
  }
  next(action);

};