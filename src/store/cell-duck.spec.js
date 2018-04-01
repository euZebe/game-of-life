import {
  ALIVE,
  cellsByIdReducer,
  createWorld,
  DEAD,
  toggleStatus
} from './cell-duck';

describe('cellsByIdReducer', () => {
  test('should create a world corresponding to the given dimensions', () => {
    let state = Object.freeze({});
    const world = cellsByIdReducer(state, createWorld(3, 2));
    expect(Object.keys(world)).toEqual(expect.arrayContaining(['0,0', '0,1', '0,2', '1,0', '1,1', '1,2']));
  });

  test('should toggle cell status', () => {
    const state = Object.freeze({ '45502sdk': { status: ALIVE, position: { x: 1, y: 5 } } });
    const state1 = cellsByIdReducer(state, toggleStatus('45502sdk'));
    expect(state1).toEqual({ '45502sdk': { status: DEAD, position: { x: 1, y: 5 } } });
  });
});
