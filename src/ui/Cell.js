import React from 'react';
import PropTypes from 'prop-types';
import { ALIVE } from '../store/cell-duck';
import './App.css';

const DefaultCell = ({ label, ...rest }) => (
  <span
    className="cell"
    role="img"
    {...rest}
 >
    {label}
  </span>
);

class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }

  handleMouseEnter = (e) => {
    e.ctrlKey && this.props.toggleStatus();
  }

  render() {
    const {status, toggleStatus} = this.props;
    return status === ALIVE
      ? <DefaultCell aria-label="alive" onClick={toggleStatus} onMouseEnter={this.handleMouseEnter} label="⬛" />
      : <DefaultCell aria-label="dead" onClick={toggleStatus} onMouseEnter={this.handleMouseEnter} label="⬜" />
    ;
  }
}

Cell.propTypes = {
  status: PropTypes.bool.isRequired,
  toggleStatus: PropTypes.func,
};

Cell.defaultProps = {
  toggleStatus: () => {},
};

export default Cell;