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

const RightAlignedButton = styled(FAButton)`
  flex: 1;
  text-align: right;
`;

const StyledFlatButton = styled(FlatButton)`
  margin-left: 5px;
  white-space: nowrap;
`;

const StyledToolbar = styled.div`
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  padding: 5px 20px 0 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const NumberInput = ({ className, name, onChange, defaultValue, placeholder, value }) => (
  <TextField
    type="number"
    defaultValue={defaultValue}
    onChange={onChange}
    hintText={placeholder}
    name={name}
    value={value}
    className={className}
  />
);

const StyledNumberInput = styled(NumberInput)`
  margin-left: 15px;
  width: 50px !important;
`;

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
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: undefined });
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
    const { areThereCells } = this.props;
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
        <StyledNumberInput name='cols' placeholder='cols' value={this.state.cols} onChange={this.handleChange}/>
        <StyledNumberInput name='rows' placeholder='rows' value={this.state.rows} onChange={this.handleChange}/>
        <StyledFlatButton primary id='createBoardBtn' onClick={this.init} label="create" disabled={!shape}/>
        {areThereCells &&
        <React.Fragment>
          <StyledFlatButton secondary id='genocideBtn' onClick={this.genocide} label="genocide"/>
          <StyledFlatButton secondary id='lifeEverywhereBtn' onClick={this.lifeEverywhere} label="life everywhere"/>
          <IterationCounter/>
        </React.Fragment>
        }
        <RightAlignedButton
          iconName="github-square"
          size="2x"
          onClick={() => window.open('https://github.com/euzebe/game-of-life')}
        />
      </StyledToolbar>
    );
  }
}
