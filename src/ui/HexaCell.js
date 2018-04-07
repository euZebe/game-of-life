import React from 'react';
import PropTypes from 'prop-types';
import { Hexagon } from 'react-hexgrid';
import { ALIVE } from '../store/cell-duck';

const styles = {
  dead: {
    fill: 'white',
    strokeWidth: 0.1,
    stroke: 'black',
  },
  alive: {
    strokeWidth: 0.1,
    stroke: 'black',
  },
};

class HexaCell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    e.ctrlKey && this.props.toggleStatus();
  };


  render() {
    const { status, q, r, s } = this.props;
    return (
      <Hexagon
        q={q}
        r={r}
        s={s}
        cellStyle={status === ALIVE ? styles.alive : styles.dead}
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