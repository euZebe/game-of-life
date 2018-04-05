import {
  ALIVE,
  cellsTableReducer, computeNextState, createHexaWorld,
  createWorld,
  DEAD, hexagonalCellsReducer, killThemAll, shapeReducer,
  toggleStatus
} from './cell-duck';
import { HEXAGON, RECTANGLE } from '../model/shapes';

describe('cellsTableReducer', () => {
  test('should create a world as a two-dimension array', () => {
    const world = cellsTableReducer(undefined, createWorld(RECTANGLE.value, 2, 3));
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
    const deadWorld = hexagonalCellsReducer(undefined, createWorld(HEXAGON.value, 7, 3, DEAD));
    expect(deadWorld).toEqual([
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ]);
    const aliveWorld = hexagonalCellsReducer(undefined, createWorld(HEXAGON.value, 7, 3, ALIVE));
    expect(aliveWorld).toEqual([
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, ALIVE, ALIVE],
    ]);
  });

  test('should compute nextState in an hexagonal dimension', () => {
    const world = [
      [DEAD, DEAD, DEAD],
         [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
         [ALIVE, ALIVE, ALIVE],
      [ALIVE, DEAD, DEAD],
         [ALIVE, DEAD, DEAD],
      [ALIVE, DEAD, DEAD],
    ];
    const nextState = hexagonalCellsReducer(world, computeNextState);
    expect(nextState).toEqual([
      [DEAD, DEAD, DEAD],
         [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
         [ALIVE, ALIVE, DEAD],
      [ALIVE, DEAD, DEAD],
         [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ]);
  });
});


describe('shapeReducer', () => {
  test('should get the shape and dimensions of the current world', () => {
    const state = shapeReducer(undefined, createWorld(RECTANGLE.value, 10, 3));
    expect(state).toEqual({
      shape: RECTANGLE.value,
      rows: 10,
      cols: 3,
    })
  });
  test('should get the hexagonal shape and dimensions of the current world', () => {
    const state = shapeReducer(undefined, createWorld(HEXAGON.value, 10, 2));
    expect(state).toEqual({
      shape: HEXAGON.value,
      rows: 10,
      cols: 2,
    })
  });
})