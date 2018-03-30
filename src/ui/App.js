import React, { Component } from 'react';
import './App.css';
import CellsContainer from './BoardContainer';
import ToolbarContainer from './ToolbarContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <ToolbarContainer/>
          <CellsContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
