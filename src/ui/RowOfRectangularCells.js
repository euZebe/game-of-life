import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const Row = styled.div`
    display: flex;
    justify-content: center;
`;

const RowOfRectangularCells = ({ cells, yIndex, toggleStatus }) => (
  <Row>
    {Object.values(cells).map((cellStatus, xIndex) => (
        <Cell
          key={`${yIndex} ${xIndex}`}
          status={cellStatus}
          toggleStatus={() => toggleStatus(xIndex, yIndex)}
        />
      )
    )}
  </Row>
);

export default RowOfRectangularCells;
