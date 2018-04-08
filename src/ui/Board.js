import React from 'react';
import Cell from './Cell';
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
  container: {
    margin: '20px',
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
      <div key={yIndex} style={yIndex % 2 === 1 ? styles.withOffset(yIndex): styles.withoutOffset(yIndex)}>
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
      <div style={styles.container}>
        {this.renderCells()}
      </div>
    );
  }
}

export default Board;