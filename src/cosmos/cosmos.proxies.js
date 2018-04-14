import createReduxProxy from 'react-cosmos-redux-proxy';

const ReduxProxy = createReduxProxy({
  createStore: state => configureStore(state)
});

export default [
  ReduxProxy
];