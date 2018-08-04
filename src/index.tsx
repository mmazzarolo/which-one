import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Router from "./screens/Router";
import RouterStore from "./stores/Router";
import registerServiceWorker from "./registerServiceWorker";
import GameStore from "./stores/Game";
import "./index.css";

const routerStore = new RouterStore();
const gameStore = new GameStore(routerStore);

ReactDOM.render(
  <Provider router={routerStore} game={gameStore}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

document.addEventListener("DOMContentLoaded", event => {
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  // let isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
  const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
  let isSafari = navigator.userAgent.indexOf("Safari") > -1;
  // let isOpera = navigator.userAgent.indexOf('Presto') > -1;
  const isMac = navigator.userAgent.indexOf("Mac OS") !== -1;
  const isWindows = !isMac;

  if (isChrome && isSafari) {
    isSafari = false;
  }

  if (isSafari || isWindows) {
    const body = document.getElementsByTagName("body")[0];
    body.style["-webkit-text-stroke"] = "1.6px";
    body.style["font-weight"] = "400";
  }

  if (isFirefox) {
    const body = document.getElementsByTagName("body")[0];
    body.style["-webkit-text-stroke"] = "1px";
    body.style["font-weight"] = "bold";
  }
});
