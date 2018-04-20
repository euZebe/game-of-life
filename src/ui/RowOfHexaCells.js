import React from 'react';
import styled from 'styled-components';
import HexaCell from './HexaCell';

const Row = styled.div`
  position: relative;
  whiteSpace: nowrap;
  left: ${props => props.yIndex % 2 === 1 ? '11px' : '0px'};
  top: ${props => props.yIndex * -5}px;
`;


const RowOfHexaCells = ({ cells, yIndex, toggleStatus }) => {
  return (
    <Row yIndex={yIndex}>
      {
        Object.values(cells).map((cellStatus, xIndex) => (
          <HexaCell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={(status) => toggleStatus(xIndex, yIndex, status)}/>)
        )
      }
    </Row>
  );
};

export default RowOfHexaCells;
