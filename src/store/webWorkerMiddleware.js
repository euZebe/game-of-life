import {
  COMPUTE_NEXT_STATE,
  CREATE_RECTANGLE_WORLD,
  SET_NEXT_GAME_STATE
} from "./cell-duck";

// eslint-disable-next-line import/no-webpack-loader-syntax
import ComputeNextStateWorker from "worker-loader!../workers/computeNextState.worker";
import { getTableOfCellsSelector } from "./reducers";

const webWorkerMiddleware = ({ dispatch, getState }) => {
  let workers = [];

  return next => {
    return action => {
      if (action.type === CREATE_RECTANGLE_WORLD) {
        let nextState = Array(action.rows).fill();
        workers.forEach(w => w.terminate());
        // init one worker per row
        workers = Array(action.rows)
          .fill()
          .map((_, rowIndex) => new ComputeNextStateWorker());
        workers.forEach(
          worker =>
            (worker.onmessage = ({ data }) => {
              nextState[data.rowIndex] = data.nextRowStatus;

              // if all rows are defined
              if (nextState.every(row => row)) {
                next({ type: SET_NEXT_GAME_STATE, nextState: [...nextState] });
                nextState = Array(nextState.length).fill();
              }
            })
        );
        next(action);
      } else if (action.type === COMPUTE_NEXT_STATE) {
        workers.forEach((worker, index) => {
          worker.postMessage({
            state: getTableOfCellsSelector(getState()),
            indexOfRowToProcess: index
          });
        });
      } else {
        next(action);
      }
    };
  };
};

export default webWorkerMiddleware;
