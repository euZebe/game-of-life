import React from 'react';
import HexaCell from './HexaCell';

const styles = {
  withOffset: (yIndex) => ({
    position: 'relative',
    left: '11px',
    top: `${yIndex * -5}px`,
  }),
  withoutOffset: (yIndex) => ({
    position: 'relative',
    top: `${yIndex * -5}px`,
  }),
};

const RowOfHexaCells = ({ cells, yIndex, toggleStatus }) => (
  <div key={yIndex} style={yIndex % 2 === 1 ? styles.withOffset(yIndex) : styles.withoutOffset(yIndex)}>
    {
      Object.values(cells).map((cellStatus, xIndex) => (
        <HexaCell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, yIndex)}/>)
      )
    }
  </div>
);

export default RowOfHexaCells;
