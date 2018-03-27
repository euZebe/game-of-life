import { connect } from 'react-redux';
import Board from './Board';
import { addCell, ALIVE, computeNextState, DEAD, toggleStatus } from '../store/cell-duck';
import { tableOfCellsSelector } from '../store/reducers';
import { updateNeighbours } from '../store/neighbours-duck';

const mapStateToProps = (state) => {
  return {
    tableOfCells: tableOfCellsSelector(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  init: () => {
    dispatch(addCell(ALIVE, { x: 0, y: 0 }));
    dispatch(addCell(ALIVE, { x: 1, y: 0 }));
    dispatch(addCell(DEAD, { x: 2, y: 0 }));
    dispatch(addCell(DEAD, { x: 0, y: 1 }));
    dispatch(addCell(DEAD, { x: 1, y: 1 }));
    dispatch(addCell(ALIVE, { x: 2, y: 1 }));
    dispatch(updateNeighbours());
  },
  toggle: (id) => dispatch(toggleStatus(id)),
  play: () => {
    dispatch(computeNextState());
  },
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;