import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE, DEAD } from '../store/cell';

const Cell = ({state}) => {
  return state === ALIVE
    ? <span role="img" aria-label="alive">🔴</span>
    : <span role="img" aria-label="dead">⭕</span>;
};

Cell.propTypes = {
  state: PropTypes.string,
}

Cell.defaultProps = {
  state: DEAD,
}

export default Cell;