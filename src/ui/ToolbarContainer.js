import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import {
  killThemAll,
  lifeEverywhere,
  createWorld,
} from '../store/cell-duck';
import { areThereCells } from '../store/reducers';

const mapStateToProps = (state) => ({
  areThereCells: areThereCells(state),
});

const mapDispatchToProps = (dispatch) => ({
  init: (shape, rowsAmount, colsAmount) => {
    dispatch(createWorld(shape, rowsAmount, colsAmount));
  },
  killThemAll: () => dispatch(killThemAll),
  lifeEverywhere: () => dispatch(lifeEverywhere),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;