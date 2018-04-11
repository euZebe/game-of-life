import React from 'react';
import Cell from './Cell';

const RowOfRectangularCells = ({ cells, yIndex, toggleStatus }) => (
  <div key={yIndex}>
    {Object.values(cells).map((cellStatus, xIndex) => (
        <Cell
          key={`${yIndex} ${xIndex}`}
          status={cellStatus}
          toggleStatus={() => toggleStatus(xIndex, yIndex)}
        />
      )
    )}
  </div>
);

export default RowOfRectangularCells;
