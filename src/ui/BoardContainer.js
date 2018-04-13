import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import Board from './Board';
import {
  getFutureHoneyCombSelector, getHoneyCombSelector, getPastHoneyCombSelector, getShapeSelector,
  getTableOfCellsSelector
} from '../store/reducers';
import { toggleStatus } from '../store/cell-duck';

const mapStateToProps = (state) => ({
  tableOfCells: getTableOfCellsSelector(state),
  honeyComb: getHoneyCombSelector(state),
  shape: getShapeSelector,
  canRedo: getFutureHoneyCombSelector(state).length,
  canUndo: getPastHoneyCombSelector(state).length,

});

const mapDispatchToProps = (dispatch) => ({
  toggleStatus: (x, y) => dispatch(toggleStatus(x, y)),
  toggleStatusHexa: (index, shape) => {
    const quotient = Math.floor(index / shape.cols);
    const remainder = index % shape.cols;
    dispatch(toggleStatus(remainder, quotient));
  },
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;