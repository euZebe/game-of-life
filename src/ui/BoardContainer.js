import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import Board from './Board';
import {
  getCurrentShape,
  getHoneyCombSelector,
  getTableOfCellsSelector,
  iterationNumberSelector,
} from '../store/reducers';
import { computeNextState, toggleStatus } from '../store/cell-duck';
import { getIsPlaying, play } from '../store/playOptions';

const mapStateToProps = (state) => ({
  tableOfCells: getTableOfCellsSelector(state),
  honeyComb: getHoneyCombSelector(state),
  canRedo: getCurrentShape(state) && iterationNumberSelector(state) >= 0,
  canUndo: iterationNumberSelector(state) > 0,
  isPlaying: getIsPlaying(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleStatus: (x, y, status) => dispatch(toggleStatus(x, y, status)),
  toggleStatusHexa: (index, shape) => {
    const quotient = Math.floor(index / shape.cols);
    const remainder = index % shape.cols;
    dispatch(toggleStatus(remainder, quotient));
  },
  togglePlay: () => dispatch(play()),
  play: () => dispatch(computeNextState),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(computeNextState),
});

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;