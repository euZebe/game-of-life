import { ALIVE, DEAD } from './cell-duck';
import { honeyCombAsSingleArraySelector, tableOfCellsSelector } from './reducers';
import { RECTANGLE, HEXAGON } from '../model/shapes';

describe('tableOfCellsSelector', () => {
  test('should select cells in a table according to their position', () => {
    const state = {
      cellsTable: [
        [ALIVE, DEAD],
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ],
      shape: {
        shape: RECTANGLE.value,
        height: 3,
        width: 2,
      }
    };

    const table = tableOfCellsSelector(state);
    expect(Object.keys(table)).toHaveLength(3);
  });

  test('should return an empty array if hexagon is current', () => {
    const state = {
      cellsTable: [],
      hexaCells: [
        [ALIVE, DEAD],
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ],
      shape: {
        shape: HEXAGON.value,
        height: 3,
        width: 2,
      }
    };
    expect(tableOfCellsSelector(state)).toHaveLength(0);
  });
});

describe('honeyCombSelector', () => {
  test('should select cells in a table according to their position', () => {
    const state = {
      hexaCells: [
        [ALIVE, DEAD],
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ],
      cellsTable: [],
      shape: {
        shape: HEXAGON.value,
        rows: 3,
        cols: 2,
      }
    };

    const table = honeyCombAsSingleArraySelector(state);
    expect(Object.keys(table)).toHaveLength(6);
  });

  test('should return an empty array if hexagon is current', () => {
    const state = {
      cellsTable: [
        [ALIVE, DEAD],
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ],
      hexaCells: [],
      shape: {
        shape: RECTANGLE.value,
        rows: 3,
        cols: 2,
      }
    };
    expect(honeyCombAsSingleArraySelector(state)).toHaveLength(0);
  });
});
