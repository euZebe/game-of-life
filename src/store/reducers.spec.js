import { ALIVE, DEAD } from './cell-duck';
import { tableOfCellsSelector } from './reducers';

describe('tableOfCellsSelector', () => {
  test('should sort cells in a table according to their position', () => {
    const state = {
      cellsById: {
        a: { id: 'a', position: { x: 0, y: 0 }, status: DEAD },
        b: { id: 'b', position: { x: 1, y: 0 }, status: DEAD },
        c: { id: 'c', position: { x: 0, y: 1 }, status: ALIVE },
        d: { id: 'd', position: { x: 1, y: 1 }, status: ALIVE },
        e: { id: 'e', position: { x: 0, y: 2 }, status: DEAD },
        f: { id: 'f', position: { x: 1, y: 2 }, status: DEAD },
      },
      world: {
        height: 3,
        width: 2,
      }
    };

    const table = tableOfCellsSelector(state);
    expect(Object.keys(table)).toHaveLength(3);
    expect(table[1][0].id).toEqual('c'); // indexes are reversed to ease the display
    expect(table[2][1].id).toEqual('f');
  });
});
