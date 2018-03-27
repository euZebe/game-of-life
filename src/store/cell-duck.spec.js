import { addCell, ALIVE, cellsByIdReducer, cellsByPositionReducer, DEAD, toggleStatus } from './cell-duck';

describe('cellsByIdReducer', () => {
  test('should add cell to current state', () => {
    let state = Object.freeze({});
    const state1 = cellsByIdReducer(state, addCell(ALIVE, { x: 1, y: 5 }));
    const state2 = cellsByIdReducer(state1, addCell(DEAD, { x: 0, y: 2 }));
    const values = Object.values(state2);
    expect(values).toContainEqual({ status: ALIVE, position: { x: 1, y: 5 } });
    expect(values).toContainEqual({ status: DEAD, position: { x: 0, y: 2 } });
  });

  test('should toggle cell status', () => {
    const state = Object.freeze({ '45502sdk': { status: ALIVE, position: { x: 1, y: 5 } } });
    const state1 = cellsByIdReducer(state, toggleStatus('45502sdk'));
    expect(state1).toEqual({ '45502sdk': { status: DEAD, position: { x: 1, y: 5 } } });
  });
});

describe('cellsByPositionReducer', () => {
  test('should add cells to the current state', () => {
    let state = Object.freeze({});
    state = cellsByPositionReducer(state, addCell(ALIVE, { x: 1, y: 5 }));
    state = cellsByPositionReducer(state, addCell(DEAD, { x: 0, y: 2 }));
    const keys = Object.keys(state);
    expect(keys).toContainEqual('1,5');
    expect(keys).toContainEqual('0,2');
    expect(typeof state['1,5']).toBe('string');
    expect(typeof state['0,2']).toBe('string');
  });
});