const INIT_RECTANGLE_WORLD = 'INIT_RECTANGLE_WORLD';

export const initRectangleWorld = (width = 10, height = 10) => ({
  type: INIT_RECTANGLE_WORLD,
  shape: 'rectangle',
  height,
  width,
});

export function worldReducer(state = {}, action) {
  switch (action.type) {
    case INIT_RECTANGLE_WORLD:
      return {
        height: action.height,
        width: action.width,
      };
    default:
      return state;
  }
}
