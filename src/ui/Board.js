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

  render() {
    const { cells, addDeadCell, addAliveCell, toggle } = this.props;
    return (
      <React.Fragment>
        <button onClick={addDeadCell}>dead</button>
        <button onClick={addAliveCell}>alive</button>
        <button onClick={this.play}>⏯</button>
        <div>
          {Object.values(cells).map(c => <Cell key={c.id} status={c.status} toggleState={() => toggle(c.id)} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default Board;