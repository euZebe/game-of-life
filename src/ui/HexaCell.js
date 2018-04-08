import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE } from '../store/cell-duck';

const cellSize = 20;

const styles = {
  dead: {
    minWidth: `${cellSize}px`,
    width: `${cellSize}px`,
    maxHeight: `${cellSize}px`,
    height: `${cellSize}px`,
    border: '1px solid white',
    backgroundColor: '#ddd',
  },
  alive: {
    minWidth: `${cellSize}px`,
    width: `${cellSize}px`,
    maxHeight: `${cellSize}px`,
    height: `${cellSize}px`,
    border: '1px solid white',
    backgroundColor: 'black',
  },
  horizontalOffset: {
    maxWidth: `${cellSize/2}px`,
    width: `${cellSize/2}px`,
  }
};

class HexaCell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    e.ctrlKey && this.props.toggleStatus();
  };


  render() {
    const { status } = this.props;
    return (
      <span
        style={status === ALIVE ? styles.alive : styles.dead}
        onMouseEnter={this.handleMouseEnter}
      />
    );
  }
};

HexaCell.propTypes = {
  status: PropTypes.bool,
  toggleStatus: PropTypes.func,
};

export default HexaCell;