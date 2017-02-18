import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

const preloadedState = window.__INITIAL_STATE__;
const store = createStore(todoApp, preloadedState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('example'));
