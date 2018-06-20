import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { iterationNumberSelector } from "../store/reducers";

const Span = styled.span`
  margin-left: 20px;
  margin-right: 10px;
  white-space: nowrap;
`;

const IterationCounter = ({iterationCounter}) => (
  <Span id='iterationCounter'>Iteration #{iterationCounter}</Span>
);

const mapStateToProps = state => ({
  iterationCounter: iterationNumberSelector(state),
})

const IterationCounterContainer = connect(mapStateToProps)(IterationCounter);

export default IterationCounterContainer;