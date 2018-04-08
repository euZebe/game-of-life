import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import HexaCell from './HexaCell';

const Container = styled.div`
`;

const styles = {
  withOffset: {
    position: 'relative',
    left: '10px',
    display: 'flex',
  },
  withoutOffset: {
    display: 'flex',
  },
};

class Board extends React.Component {

  renderRowOfCells = (cells, yIndex) => {
    const { toggleStatus } = this.props;
    return (
      <div key={yIndex}>
        {Object.values(cells).map((cellStatus, xIndex) => (
          <Cell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, yIndex)}/>)
        )}
      </div>
    );
  };

  renderRowOfHexaCells = (cells, yIndex) => {
    const { toggleStatus } = this.props;
    return (
      <div key={yIndex} style={yIndex % 2 === 1 ? styles.withOffset: styles.withoutOffset}>
        {Object.values(cells).map((cellStatus, xIndex) => (
          <HexaCell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, yIndex)}/>)
        )}
      </div>
    );
  };

  renderCells = () => {
    const { tableOfCells, honeyComb } = this.props;
    if (tableOfCells.length) {
      return tableOfCells.map(this.renderRowOfCells);
    } else if (honeyComb.length) {
      return honeyComb.map(this.renderRowOfHexaCells);
    }
    return <div />;
  };

  render() {
    return (
      <Container>
        {this.renderCells()}
      </Container>
    );
  }
}

export default Board;