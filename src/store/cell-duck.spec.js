import {
  ALIVE,
  cellsTableReducer, computeNextState,
  createWorld,
  DEAD, killThemAll,
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