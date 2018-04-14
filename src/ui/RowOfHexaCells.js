import React from 'react';
import HexaCell from './HexaCell';

const styles = {
  hexaCell: {
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  withOffset: (yIndex) => (
    yIndex % 2 === 1
      ? {
        left: '11px',
        top: `${yIndex * -5}px`,
      }
      : {
        top: `${yIndex * -5}px`,
      }
  ),
};

const RowOfHexaCells = ({ cells, yIndex, toggleStatus }) => {
  const style = { ...styles.hexaCell, ...styles.withOffset(yIndex) };
  return (
    <div key={yIndex} style={style}>
      {
        Object.values(cells).map((cellStatus, xIndex) => (
          <HexaCell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={(status) => toggleStatus(xIndex, yIndex, status)}/>)
        )
      }
    </div>
  );
};

export default RowOfHexaCells;
