import { connect } from 'react-redux';
import Board from './Board';
import { addCell, ALIVE, computeNextState, DEAD, toggleStatus, updateNeighbours } from '../store/cell-duck';
import { initRectangleWorld } from '../store/world-duck';
import { tableOfCellsSelector, worldHeight, worldWidth } from '../store/reducers';

const mapStateToProps = (state) => {
  return {
    tableOfCells: tableOfCellsSelector(state),
    lines: worldHeight(state),
    rows: worldWidth(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  play: () => {
    dispatch(addCell(ALIVE, { x: 0, y: 0 }));
    dispatch(addCell(ALIVE, { x: 1, y: 0 }));
    dispatch(addCell(DEAD, { x: 2, y: 0 }));
    dispatch(addCell(DEAD, { x: 0, y: 1 }));
    dispatch(addCell(DEAD, { x: 1, y: 1 }));
    dispatch(addCell(ALIVE, { x: 2, y: 1 }));
  },
  toggle: (id) => dispatch(toggleStatus(id)),
  init: () => {
    dispatch(initRectangleWorld());
    dispatch(updateNeighbours());
  },
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;