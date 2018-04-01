import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import {
  computeNextState,
  killThemAll,
  lifeEverywhere, createWorld,
} from '../store/cell-duck';
import { cellsByIdSelector } from '../store/reducers';

const mapStateToProps = (state) => ({
  thereAreCells: Object.keys(cellsByIdSelector(state)).length > 0,
});

const mapDispatchToProps = (dispatch) => ({
  init: (rowsAmount, colsAmount) => dispatch(createWorld(rowsAmount, colsAmount)),
  play: () => dispatch(computeNextState),
  killThemAll: () => dispatch(killThemAll),
  lifeEverywhere: () => dispatch(lifeEverywhere),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;