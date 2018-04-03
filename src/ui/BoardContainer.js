import { connect } from 'react-redux';
import Board from './Board';
import { honeyCombAsSingleArraySelector, tableOfCellsSelector } from '../store/reducers';
import { toggleStatus } from '../store/cell-duck';

const mapStateToProps = (state) => ({
  tableOfCells: tableOfCellsSelector(state),
  honeyComb: honeyCombAsSingleArraySelector(state),
  shape: state.shape,
});

const mapDispatchToProps = {
  toggleStatus,
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;