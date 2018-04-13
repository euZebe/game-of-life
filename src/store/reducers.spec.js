import { ALIVE, DEAD } from './cell-duck';
import { honeyCombAsSingleArraySelector, getTableOfCellsSelector } from './reducers';
import { RECTANGLE, HEXAGON } from '../model/shapes';

describe('getTableOfCellsSelector', () => {
  test('should select cells in a table according to their position', () => {
    const state = {
      cellsTable: {
        past:[],
        present: [
          [ALIVE, DEAD],
          [DEAD, DEAD],
          [ALIVE, ALIVE],
        ],
      },
      shape: {
        shape: RECTANGLE.value,
        height: 3,
        width: 2,
      }
    };

    const table = getTableOfCellsSelector(state);
    expect(Object.keys(table)).toHaveLength(3);
  });

  test('should return an empty array if hexagon is current', () => {
    const state = {
      cellsTable: {present:[]},
      hexaCells: {
        present: [
          [ALIVE, DEAD],
          [DEAD, DEAD],
          [ALIVE, ALIVE],
        ],
      },
      shape: {
        shape: HEXAGON.value,
        height: 3,
        width: 2,
      }
    };
    expect(getTableOfCellsSelector(state)).toHaveLength(0);
  });
});

describe('getHoneyCombSelector', () => {
  test('should select cells in a table according to their position', () => {
    const state = {
      hexaCells: {present:[
        [ALIVE, DEAD],
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ],},
      cellsTable: {
        present: []
      },
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
