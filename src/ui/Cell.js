import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ALIVE, StatusType } from '../store/cell-duck';
import './App.css';

const cellSize = 15;

const StyledCell = styled.div`
    width: ${cellSize}px;
    height: ${cellSize}px;
    min-width: ${cellSize}px;
    min-height: ${cellSize}px;
    margin: 1px;
    background-color: ${props => props.status === ALIVE ? 'black': '#ddd'};
`;

StyledCell.propTypes = {
  status: StatusType.isRequired,
};


class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    e.ctrlKey && this.props.toggleStatus();
  };

  render() {
    const { status, toggleStatus } = this.props;
    return <StyledCell status={status} onClick={toggleStatus} onMouseEnter={this.handleMouseEnter} />
  }
}

Cell.propTypes = {
  status: StatusType.isRequired,
  toggleStatus: PropTypes.func,
};

Cell.defaultProps = {
  toggleStatus: () => {
  },
};

export default Cell;