import React from 'react';

export default class Toolbar extends React.Component {

  init = () => {
    this.props.init(this.rowsInput.value, this.colsInput.value);
  };

  play = () => {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    } else if (this.rowsInput.value && this.colsInput.value) {
      this.intervalID = setInterval(this.props.play, 500);
    }
  };

  render() {
    return (
      <React.Fragment>
        <label>
          Rows: <input defaultValue={10} type="number" ref={rows => this.rowsInput = rows}/>
        </label>
        <label>
          Columns: <input defaultValue={20} type="number" ref={cols => this.colsInput = cols}/>
        </label>
        <button role="img" aria-label="create" onClick={this.init}>🎆</button>
        <button role="img" aria-label="play" onClick={this.play}>⏯</button>

      </React.Fragment>
    );
  }
}
