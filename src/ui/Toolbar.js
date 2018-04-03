import React from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IterationCounter from './IterationCounter';
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
  }
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
const shapes = [
  { value: 'rectangle', label: 'rectangle' },
  { value: 'hexagon', label: 'hexagon' },
];

export default class Toolbar extends React.PureComponent {

  state = {
    shape: undefined,
    cols: 20,
    rows: 10,
  };
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
  };

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
          {shapes.map(s => <MenuItem value={s.value} primaryText={s.label} />)}
        </SelectField>
          {shape === 'hexagon' &&
            <Input name='rows' placeholder='rows' value={this.state.rows} onChange={this.handleChange} />
        }
        {
          shape === 'rectangle' &&
            <React.Fragment>
              <Input name='cols' placeholder='cols' value={this.state.cols} onChange={this.handleChange} />
              <Input name='rows' placeholder='rows' value={this.state.rows} onChange={this.handleChange} />
            </React.Fragment>
        }
        <FlatButton primary onClick={this.init} label="create" style={styles.button} />
        {thereAreCells &&
        <React.Fragment>
          <FlatButton primary onClick={this.play} label="play" style={styles.button} />
          <FlatButton secondary onClick={this.genocide} label="genocide" style={styles.button} />
          <FlatButton secondary onClick={this.lifeEverywhere} label="life everywhere" style={styles.button} />
          <IterationCounter />
        </React.Fragment>
        }
      </StyledToolbar>
    );
  }
}
