import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE, DEAD } from '../store/cell-duck';
import './App.css';

class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  render() {
    const {status, toggleState} = this.props;
    return status === ALIVE
      ? <span className="cell" role="img" aria-label="alive" onClick={toggleState}>⬛</span>
      : <span className="cell" role="img" aria-label="dead" onClick={toggleState}>⬜</span>;
  }
}

Cell.propTypes = {
  status: PropTypes.string.isRequired,
  toggleState: PropTypes.func,
};

Cell.defaultProps = {
  toggleState: () => {},
};

export default Cell;