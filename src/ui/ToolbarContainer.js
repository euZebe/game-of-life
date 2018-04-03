import { connect } from 'react-redux';
import Toolbar, { RECTANGLE, HEXAGON } from './Toolbar';
import {
  computeNextState,
  killThemAll,
  lifeEverywhere, createWorld, createHexaWorld,
} from '../store/cell-duck';
import { tableOfCellsSelector } from '../store/reducers';

const mapStateToProps = (state) => ({
  thereAreCells: tableOfCellsSelector(state).length > 0,
});

const mapDispatchToProps = (dispatch) => ({
  init: (shape, rowsAmount, colsAmount) => {
    if (shape === RECTANGLE.value) {
      dispatch(createWorld(rowsAmount, colsAmount));
    } else if (shape === HEXAGON.value) {
      dispatch(createHexaWorld(rowsAmount));
    }
  },
  play: () => dispatch(computeNextState),
  killThemAll: () => dispatch(killThemAll),
  lifeEverywhere: () => dispatch(lifeEverywhere),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;