/* eslint-disable no-restricted-globals */
import { ALIVE, DEAD } from "../store/cell-duck";

function nextCellStatus(cellStatus, neighboursStatus) {
  const aliveNeighbours = neighboursStatus.filter(n => n === ALIVE);
  return aliveNeighbours &&
    ((cellStatus === ALIVE && aliveNeighbours.length === 2) ||
      aliveNeighbours.length === 3)
    ? ALIVE
    : DEAD;
}

function nextRowStatus(y, state) {
  const row = [];
  let x;
  for (x = 0; x < state[y].length; x++) {
    row.push(
      nextCellStatus(state[y][x], [
        y > 0 && state[y - 1][x - 1],
        state[y][x - 1],
        y < state.length - 1 && state[y + 1][x - 1],
        y > 0 && state[y - 1][x],
        y < state.length - 1 && state[y + 1][x],
        y > 0 && state[y - 1][x + 1],
        state[y][x + 1],
        y < state.length - 1 && state[y + 1][x + 1]
      ])
    );
  }
  return row;
}

self.onmessage = ({ data: { state, indexOfRowToProcess } }) => {
  if (isNaN(indexOfRowToProcess)) {
    const nextWorldState = [];
    for (let y = 0; y < state.length; y++) {
      const row = nextRowStatus(y, state);
      nextWorldState.push(row);
    }
    self.postMessage(nextWorldState);
  } else {
    self.postMessage({rowIndex: indexOfRowToProcess, nextRowStatus: nextRowStatus(indexOfRowToProcess, state) });
  }
};
