import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import {
addCell,
computeNextState,
DEAD,
ALIVE,
iterationNumberSelector,
killThemAll,
lifeEverywhere,
} from '../store/cell-duck';
import { updateNeighbours } from '../store/neighbours-duck';

const mapStateToProps = (state) => ({
  iterationNumber: iterationNumberSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  init: (rowsAmount, colsAmount) => {
    for (let y = 0; y < rowsAmount; y++) {
      for (let x = 0; x < colsAmount; x++) {
        const status = Math.random() < 0.5 ? ALIVE : DEAD;
        dispatch(addCell(status, { x, y }));
      }
    }
    dispatch(updateNeighbours);
  },
  play: () => dispatch(computeNextState),
  killThemAll: () => dispatch(killThemAll),
  lifeEverywhere: () => dispatch(lifeEverywhere),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;