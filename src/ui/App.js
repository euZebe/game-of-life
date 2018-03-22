import React, { Component } from 'react';
import './App.css';
import CellsContainer from './BoardContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <CellsContainer />
      </div>
    );
  }
}

export default App;
