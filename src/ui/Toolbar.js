import React from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IterationCounter from './IterationCounter';
import { shapes, HEXAGON } from '../model/shapes';
import FAButton from './FAButton';
import './App.css';

const styles = {
  input: {
    marginLeft: '15px',
    width: '50px',
  },
  button: {
    marginLeft: '5px',
  },
  select: {
    width: '160px',
  },
  githubIcon: {
    marginLeft: 'auto',
  },
};

const StyledToolbar = styled.div`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    padding: 5px 20px 0 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
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

  state = {
    shape: HEXAGON.value,
    cols: 20,
    rows: 10,
    intervalID: undefined,
  };

  init = () => {
    const { shape, rows, cols } = this.state;
    this.props.init(shape, rows, cols);
    this.stop();
  };

  stop = () => {
    if (this.state.intervalID) {
      clearInterval(this.intervalID);
      this.setState({ intervalID: undefined });
    }
  };

  play = () => {
    const { rows, cols } = this.state;
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: undefined });
    } else if (rows && cols) {
      const intervalID = setInterval(this.props.play, ITERATION_INTERVAL);
      this.setState({ intervalID });
    }
  };

  genocide = () => {
    this.stop();
    this.props.killThemAll();
  };

  lifeEverywhere = () => {
    this.stop();
    this.props.lifeEverywhere();
  };

  handleChange = (e) => {
    const field = e.target.name;
    this.setState({ [field]: e.target.value });
  };

  handleShapeChange = (event, index, value) => {
    this.setState({ shape: value });
  };

  render() {
    const { thereAreCells } = this.props;
    const { shape } = this.state;
    return (
      <StyledToolbar>
        <SelectField
          name="grid-shape"
          onChange={this.handleShapeChange}
          value={shape}
        >
          {shapes.map(s => <MenuItem key={s.value} value={s.value} primaryText={s.label}/>)}
        </SelectField>
        <Input name='cols' placeholder='cols' value={this.state.cols} onChange={this.handleChange}/>
        <Input name='rows' placeholder='rows' value={this.state.rows} onChange={this.handleChange}/>
        <FlatButton primary onClick={this.init} label="create" style={styles.button} disabled={!shape}/>
        {thereAreCells &&
        <React.Fragment>
          {this.state.intervalID
            ? <FAButton iconName='pause-circle' size='2x' style={styles.button} onClick={this.play}/>
            : <FAButton iconName='play-circle' size='2x' style={styles.button} onClick={this.play}/>
          }
          <FlatButton secondary onClick={this.genocide} label="genocide" style={styles.button}/>
          <FlatButton secondary onClick={this.lifeEverywhere} label="life everywhere" style={styles.button}/>
          <IterationCounter/>
        </React.Fragment>
        }
        <FAButton
          iconName="github-square"
          size="2x"
          style={styles.githubIcon}
          onClick={() => window.open('https://github.com/euzebe/game-of-life')}
        />
      </StyledToolbar>
    );
  }
}
