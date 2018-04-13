import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import {
  computeNextState,
  killThemAll,
  lifeEverywhere,
  createWorld,
} from '../store/cell-duck';
import { honeyCombAsSingleArraySelector, getTableOfCellsSelector } from '../store/reducers';

const mapStateToProps = (state) => ({
  thereAreCells: getTableOfCellsSelector(state).length > 0 || honeyCombAsSingleArraySelector(state).length > 0,
});

const mapDispatchToProps = (dispatch) => ({
  init: (shape, rowsAmount, colsAmount) => {
    dispatch(createWorld(shape, rowsAmount, colsAmount));
  },
  play: () => dispatch(computeNextState),
  killThemAll: () => dispatch(killThemAll),
  lifeEverywhere: () => dispatch(lifeEverywhere),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;