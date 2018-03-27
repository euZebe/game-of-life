import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  renderRowOfCells = (cells, index) => {
    const { toggle } = this.props;
    return (
      <div key={index}>
        {Object.values(cells).map(c => <Cell key={c.id} status={c.status} toggleState={() => toggle(c.id)}/>)}
      </div>
    );
  }

  renderCells = () => {
    const { tableOfCells } = this.props;
    return Object.values(tableOfCells).map(this.renderRowOfCells);
  }

  render() {
    const {init, play} = this.props;
    return (
      <React.Fragment>
        <span role="img" aria-label="init" onClick={init}>🎆</span>
        <span role="img" aria-label="play" onClick={play}>⏯</span>
        <div>
          {this.renderCells()}
        </div>
      </React.Fragment>
    );
  }
}

export default Board;