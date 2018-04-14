import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ALIVE, DEAD } from '../store/cell-duck';
import './hexaCell.css';

const cellSize = 20;

const cellStyle = {
  width: `${cellSize}px`,
  height: `${cellSize}px`,
};

class HexaCell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    if (e.ctrlKey) {
      this.props.toggleStatus(DEAD);
    } else if (e.altKey) {
      this.props.toggleStatus(ALIVE);
    }
  };


  render() {
    const { status } = this.props;
    const className = classnames('hexagon', status === ALIVE ? 'alive' : 'dead');
    return (
      <div className="hexagon-wrapper" style={cellStyle}>
        <div className={className} onMouseEnter={this.handleMouseEnter}/>
      </div>
    );
  }
};

HexaCell.propTypes = {
  status: PropTypes.string.isRequired,
  toggleStatus: PropTypes.func,
};

export default HexaCell;