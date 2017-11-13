/* @flow */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './screens/Router';
import GameStore from './stores/Game';
import RouterStore from './stores/Router';
import './index.css';

const gameStore = new GameStore();
const routerStore = new RouterStore();

ReactDOM.render(
  <Provider game={gameStore} router={routerStore}>
    <Router />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
);

// registerServiceWorker();
