import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  renderRowOfCells = (cells, index) => {
    const { toggleStatus } = this.props;
    return (
      <div key={index}>
        {Object.values(cells).map(c => <Cell key={c.id} status={c.status} toggleStatus={() => toggleStatus(c.id)}/>)}
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