import { connect } from 'react-redux';
import Board from './Board';
import { tableOfCellsSelector } from '../store/reducers';
import { toggleStatus } from '../store/cell-duck';

const mapStateToProps = (state) => ({
    tableOfCells: tableOfCellsSelector(state),
});

const mapDispatchToProps = {
  toggleStatus,
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;