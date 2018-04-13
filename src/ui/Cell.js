import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE } from '../store/cell-duck';
import './App.css';

const cellSize = 10;

const cellStyles = {
  alive: {
    backgroundColor: 'black',
  },
  dead: {
    backgroundColor: '#ddd',
  },
  cell: {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    minWidth: `${cellSize}px`,
    minHeight: `${cellSize}px`,
    margin: '1px',
  }
};


class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    e.ctrlKey && this.props.toggleStatus();
  };

  render() {
    const { status, toggleStatus } = this.props;
    const style= {
      ...cellStyles.cell,
      ...(status === ALIVE ? cellStyles.alive : cellStyles.dead)
    };
    return <div style={style} onClick={toggleStatus} onMouseEnter={this.handleMouseEnter} />
  }
}

Cell.propTypes = {
  status: PropTypes.bool.isRequired,
  toggleStatus: PropTypes.func,
};

Cell.defaultProps = {
  toggleStatus: () => {
  },
};

export default Cell;