import { connect } from 'react-redux';
import Board from './Board';
import { toggleStatus } from '../store/cell-duck';
import { tableOfCellsSelector } from '../store/reducers';

const mapStateToProps = (state) => {
  return {
    tableOfCells: tableOfCellsSelector(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleStatus(id)),
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;