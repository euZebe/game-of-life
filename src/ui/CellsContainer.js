import { connect } from 'react-redux';
import Cells from './Cells';
import { addCell, ALIVE, DEAD } from '../store/cell';

const mapStateToProps = (state) => {
  return {
    cells: state.cells,
  }
};

const mapDispatchToProps = (dispatch) => ({
  addDeadCell: () => dispatch(addCell(DEAD)),
  addAliveCell: () => dispatch(addCell(ALIVE)),
});

const CellsContainer = connect(mapStateToProps, mapDispatchToProps)(Cells);

export default CellsContainer;