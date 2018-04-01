import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE } from '../store/cell-duck';
import './App.css';

class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  render() {
    const {status, toggleStatus} = this.props;
    return status === ALIVE
      ? <span className="cell" role="img" aria-label="alive" onClick={toggleStatus}>⬛</span>
      : <span className="cell" role="img" aria-label="dead" onClick={toggleStatus}>⬜</span>;
  }
}

Cell.propTypes = {
  status: PropTypes.bool.isRequired,
  toggleStatus: PropTypes.func,
};

Cell.defaultProps = {
  toggleStatus: () => {},
};

export default Cell;