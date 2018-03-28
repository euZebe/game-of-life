import React, { Component } from 'react';
import './App.css';
import CellsContainer from './BoardContainer';
import ToolbarContainer from './ToolbarContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ToolbarContainer/>
        <CellsContainer/>
      </div>
    );
  }
}

export default App;
