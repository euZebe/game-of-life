import { connect } from 'react-redux';
import Board from './Board';
import { honeyCombAsSingleArraySelector, tableOfCellsSelector } from '../store/reducers';
import { toggleStatus } from '../store/cell-duck';

const mapStateToProps = (state) => ({
  tableOfCells: tableOfCellsSelector(state),
  honeyComb: honeyCombAsSingleArraySelector(state),
  shape: state.shape,
});

const mapDispatchToProps = (dispatch) => ({
  toggleStatus: (x, y) => dispatch(toggleStatus(x, y)),
  toggleStatusHexa: (index, shape) => {
    const quotient = Math.floor(index / shape.cols);
    const remainder = index % shape.cols;
    dispatch(toggleStatus(remainder, quotient));
  },
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;