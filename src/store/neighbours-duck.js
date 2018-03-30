import { cellsByIdSelector, cellsIDByPositionSelector } from './reducers';

export const UPDATE_NEIGHBOURS = 'UPDATE_NEIGHBOURS';


export const updateNeighbours = {
  type: UPDATE_NEIGHBOURS
};

/**
 * @param state - complete state available here
 * @param action
 * @returns {*}
 */
export const updateNeighboursReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEIGHBOURS:
      const cellsByPosition = cellsIDByPositionSelector(state);
      const cellsWithNeighboursToUpdate = Object.values(cellsByIdSelector(state));
      const cellsById = cellsWithNeighboursToUpdate
        .map(cell => ({
          ...cell,
          neighboursIDs: getNeighboursIDs(cellsByPosition, cell.position),
        })).reduce((aggregator, cell) => ({
            ...aggregator,
            [cell.id]: cell,
          }), {}
        );

      return {
        ...state,
        cellsById,
      };

    default:
      return state;
  }
};


function getNeighboursIDs(cellsByPosition, position) {
  const { x, y } = position;
  return [
    cellsByPosition[`${x - 1},${y - 1}`],
    cellsByPosition[`${x},${y - 1}`],
    cellsByPosition[`${x + 1},${y - 1}`],
    cellsByPosition[`${x - 1},${y}`],
    cellsByPosition[`${x + 1},${y}`],
    cellsByPosition[`${x - 1},${y + 1}`],
    cellsByPosition[`${x},${y + 1}`],
    cellsByPosition[`${x + 1},${y + 1}`],
  ].filter(cell => !!cell); // remove undefined
}