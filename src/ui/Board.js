import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  renderRowOfCells = (cells, xIndex) => {
    const { toggleStatus } = this.props;
    return (
      <div key={xIndex}>
        {Object.values(cells).map((cellStatus, yIndex) => (
          <Cell key={`${xIndex} ${yIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, yIndex)}/>)
        )}
      </div>
    );
  };

  renderCells = () => {
    const { tableOfCells } = this.props;
    return Object.values(tableOfCells).map(this.renderRowOfCells);
  };

  render() {
    console.log('re-rendering at ' + new Date().getMilliseconds());
    return (
      <React.Fragment>
        {this.renderCells()}
      </React.Fragment>
    );
  }
}

export default Board;