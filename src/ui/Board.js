import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  renderRowOfCells = (cells, colIndex) => {
    const { toggleStatus } = this.props;
    return (
      <div key={colIndex}>
        {Object.values(cells).map((cellStatus, xIndex) => (
          <Cell key={`${colIndex} ${xIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, colIndex)}/>)
        )}
      </div>
    );
  };

  renderCells = () => {
    const { tableOfCells } = this.props;
    return Object.values(tableOfCells).map(this.renderRowOfCells);
  };

  render() {
    return (
      <React.Fragment>
        {this.renderCells()}
      </React.Fragment>
    );
  }
}

export default Board;