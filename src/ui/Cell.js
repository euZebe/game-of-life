import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE, DEAD } from '../store/cell-duck';
import './App.css';

const Cell = ({status, toggleState}) => {
  return status === ALIVE
    ? <span className="cell" role="img" aria-label="alive" onClick={toggleState}>⬛</span>
    : <span className="cell" role="img" aria-label="dead" onClick={toggleState}>⬜</span>;
};

Cell.propTypes = {
  state: PropTypes.string,
  toggleState: PropTypes.func,
};

Cell.defaultProps = {
  state: DEAD,
  toggleState: () => {},
};

export default Cell;