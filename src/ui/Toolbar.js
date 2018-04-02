import React from 'react';
import styled from 'styled-components';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IterationCounter from './IterationCounter';

const styles = {
  input: {
    width: '50px',
  },
  button: {
    marginLeft: '5px',
  },
};

const StyledToolbar = styled.div`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    padding: 5px 20px 0 20px;
    margin-bottom: 10px;
`;

const Input = ({ name, onChange, defaultValue, placeholder, value }) => (
  <TextField
    type="number"
    defaultValue={defaultValue}
    onChange={onChange}
    hintText={placeholder}
    style={styles.input}
    name={name}
    value={value}
  />
);

const ITERATION_INTERVAL = 100;

export default class Toolbar extends React.PureComponent {

  state = { cols: 20, rows: 10 };
  intervalID = undefined;

  init = () => {
    const { rows, cols } = this.state;
    this.props.init(rows, cols);
    this.stop();
  };

  stop = () => {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  }

  play = () => {
    const { rows, cols } = this.state;
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    } else if (rows && cols) {
      this.intervalID = setInterval(this.props.play, ITERATION_INTERVAL);
    }
  };

  genocide = () => {
    this.stop();
    this.props.killThemAll();
  };

  lifeEverywhere = () => {
    this.stop();
    this.props.lifeEverywhere();
  }

  handleChange = (e) => {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { thereAreCells } = this.props;
    return (
      <StyledToolbar>
        {
          Object.keys(this.state).map(key => (
            <Input key={key} name={key} placeholder={key} value={this.state[key]} onChange={this.handleChange}/>
          ))
        }
        <RaisedButton primary onClick={this.init} label="create" style={styles.button}/>
        {thereAreCells &&
        <React.Fragment>
          <RaisedButton primary onClick={this.play} label="play" style={styles.button}/>
          <RaisedButton secondary onClick={this.genocide} label="genocide" style={styles.button}/>
          <RaisedButton secondary onClick={this.lifeEverywhere} label="life everywhere" style={styles.button}/>
          <IterationCounter/>
        </React.Fragment>
        }
      </StyledToolbar>
    );
  }
}
