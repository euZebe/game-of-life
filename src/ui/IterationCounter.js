import React from 'react';
import { connect } from 'react-redux';
import { iterationNumberSelector } from '../store/cell-duck';

const IterationCounter = ({iterationCounter}) => (
  <span>Iteration #{iterationCounter}</span>
);

const mapStateToProps = state => ({
  iterationCounter: iterationNumberSelector(state),
})

const IterationCounterContainer = connect(mapStateToProps)(IterationCounter);

export default IterationCounterContainer;