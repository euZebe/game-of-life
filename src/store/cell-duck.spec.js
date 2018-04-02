import {
  ALIVE,
  cellsTableReducer, computeNextState, createHexaWorld,
  createWorld,
  DEAD, hexagonalCellsReducer, killThemAll,
  toggleStatus
} from './cell-duck';

describe('cellsTableReducer', () => {
  test('should create a world as a two-dimension array', () => {
    const world = cellsTableReducer(undefined, createWorld(2, 3));
    const fullOfLifeWorld = cellsTableReducer(world, killThemAll);
    expect(fullOfLifeWorld).toEqual([
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ]);
  });
  test('should process nextState for all cells of the two-dimension array', () => {
    const initialState = Object.freeze([
      Object.freeze([ALIVE, ALIVE, ALIVE]),
      Object.freeze([DEAD, DEAD, DEAD]),
    ]);
    const nextState = cellsTableReducer(initialState, computeNextState);
    expect(nextState).toEqual([
      [DEAD, ALIVE, DEAD],
      [DEAD, ALIVE, DEAD],
    ]);
  });

  test('should toggle cell status identifed by the given coordinates', () => {
    const initialState = Object.freeze([
      Object.freeze([ALIVE, ALIVE, ALIVE]),
      Object.freeze([DEAD, DEAD, DEAD]),
    ]);

    const nextState = cellsTableReducer(initialState, toggleStatus(2, 1));

    expect(nextState).toEqual([
      [ALIVE, ALIVE, ALIVE],
      [DEAD, DEAD, ALIVE],
    ]);
  });
});

describe('hexagonalCellsReducer', () => {
  test('should create a world of cells with hexagonal relations', () => {
    const deadWorld = hexagonalCellsReducer(undefined, createHexaWorld(3, DEAD));
    expect(deadWorld).toEqual([
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [DEAD, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [DEAD, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [DEAD, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
    ]);
    const aliveWorld = hexagonalCellsReducer(undefined, createHexaWorld(3, ALIVE));
    expect(aliveWorld).toEqual([
      [undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [ALIVE, undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [ALIVE, undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [ALIVE, undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
      [undefined, ALIVE, undefined, ALIVE, undefined, ALIVE],
    ]);
  });

  test('should compute nextState in an hexagonal dimension', () => {
    const world = [
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [ALIVE, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [ALIVE, undefined, ALIVE, undefined, ALIVE, undefined, DEAD],
      [undefined, ALIVE, undefined, DEAD, undefined, DEAD],
      [ALIVE, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, ALIVE, undefined, DEAD, undefined, DEAD],
    ];
    const nextState = hexagonalCellsReducer(world, computeNextState);
    expect(nextState).toEqual([
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [DEAD, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [ALIVE, undefined, ALIVE, undefined, DEAD, undefined, DEAD],
      [undefined, ALIVE, undefined, ALIVE, undefined, DEAD],
      [ALIVE, undefined, DEAD, undefined, DEAD, undefined, DEAD],
      [undefined, DEAD, undefined, DEAD, undefined, DEAD],
    ]);
  });
});