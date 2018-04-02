import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { iterationNumberSelector } from '../store/cell-duck';

const Span = styled.span`
  margin-left: 20px;
`;

const IterationCounter = ({iterationCounter}) => (
  <Span>Iteration #{iterationCounter}</Span>
);

const mapStateToProps = state => ({
  iterationCounter: iterationNumberSelector(state),
})

const IterationCounterContainer = connect(mapStateToProps)(IterationCounter);

export default IterationCounterContainer;