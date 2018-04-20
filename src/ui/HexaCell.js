import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ALIVE, DEAD, StatusType } from '../store/cell-duck';
import './hexaCell.css';

const cellSize = 20;

const CellWrapper = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
`;

const DeadOrAliveCell = styled.div`
    background-color: ${props => props.status === ALIVE ? 'black': '#ddd'};
`;

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
    return (
      <CellWrapper className="hexagon-wrapper">
        <DeadOrAliveCell
          className='hexagon'
          status={this.props.status}
          onMouseEnter={this.handleMouseEnter}
        />
      </CellWrapper>
    );
  }
};

HexaCell.propTypes = {
  status: StatusType.isRequired,
  toggleStatus: PropTypes.func,
};

export default HexaCell;