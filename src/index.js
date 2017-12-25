/* @flow */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './screens/Router';
import GameStore from './stores/Game';
import RouterStore from './stores/Router';
import './index.css';

const routerStore = new RouterStore();
const gameStore = new GameStore(routerStore);

ReactDOM.render(
  <Provider game={gameStore} router={routerStore}>
    <Router />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
);

// registerServiceWorker();
document.addEventListener('DOMContentLoaded', function(event) {
  let isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  let isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
  let isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
  let isSafari = navigator.userAgent.indexOf('Safari') > -1;
  let isOpera = navigator.userAgent.indexOf('Presto') > -1;
  let isMac = navigator.userAgent.indexOf('Mac OS') != -1;
  let isWindows = !isMac;

  if (isChrome && isSafari) {
    isSafari = false;
  }

  if (isSafari || isWindows) {
    const body = document.getElementsByTagName('body')[0];
    body.style['-webkit-text-stroke'] = '1.6px';
    body.style['font-weight'] = '400';
  }

  if (isFirefox) {
    const body = document.getElementsByTagName('body')[0];
    body.style['-webkit-text-stroke'] = '1px';
    body.style['font-weight'] = 'bold';
  }
});
