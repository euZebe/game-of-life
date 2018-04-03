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

const HexaCell = ({ status, q, r, s }) => (
  <Hexagon q={q} r={r} s={s} cellStyle={status === ALIVE ? styles.alive : styles.dead} />
);

HexaCell.propTypes = {
  status: PropTypes.bool,
  toggleStatus: PropTypes.func,
};

export default HexaCell;