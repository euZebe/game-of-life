import { connect } from 'react-redux';
import Cells from './Board';
import { addCell, computeNextState, toggleStatus, ALIVE, DEAD } from '../store/cell-duck';

const mapStateToProps = (state) => {
  return {
    cells: state.cells,
  }
};

const mapDispatchToProps = (dispatch) => ({
  addDeadCell: () => dispatch(addCell(DEAD)),
  addAliveCell: () => dispatch(addCell(ALIVE)),
  play: () => dispatch(computeNextState()),
  toggle: (id) => dispatch(toggleStatus(id)),
});

const CellsContainer = connect(mapStateToProps, mapDispatchToProps)(Cells);

export default CellsContainer;