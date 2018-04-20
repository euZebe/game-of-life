import { createSelector } from 'reselect';
import { computeNextState } from './cell-duck';
import { playOptionsSelector } from './reducers';

const TOGGLE_PLAY = 'TOGGLE_PLAY';

const togglePlay = processID => ({
  type: TOGGLE_PLAY,
  processID
});

const ITERATION_DURATION = 100;
export const playPause = () => (dispatch, getState) => {
  if (getIsPlaying(getState())) {
    clearInterval(getProcessID(getState()));
    dispatch(togglePlay(undefined));
  } else {
    const processID = setInterval(() => dispatch(computeNextState), ITERATION_DURATION);
    dispatch(togglePlay(processID));
  }
};

export const getIsPlaying = createSelector(
  playOptionsSelector,
  subState => subState.isPlaying
);

const getProcessID = createSelector(
  playOptionsSelector,
  subState => subState.processID,
);

export default function playOptionsReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
        processID: action.processID,
      };
    default:
      return state;
  }
}