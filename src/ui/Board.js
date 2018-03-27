import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  play = () => {
    // const { addAliveCell } = this.props;
    // if (!this.intervalId) {
    //   this.intervalId = setInterval(addAliveCell, 1000);
    // } else {
    //   clearInterval(this.intervalId);
    //   this.intervalId = undefined;
    // }
    this.props.play();
  }

  renderRowOfCells = (cells) => {
    const { toggle } = this.props;
    return (
      <div>
        {Object.values(cells).map(c => <Cell key={c.id} status={c.status} toggleState={() => toggle(c.id)}/>)}
      </div>
    );
  }

  renderCells = () => {
    const { tableOfCells } = this.props;
    return Object.values(tableOfCells).map(this.renderRowOfCells);
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.play}>⏯</button>
        <div>
          {this.renderCells()}
        </div>
      </React.Fragment>
    );
  }
}

export default Board;