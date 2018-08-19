import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Router from "./screens/Router";
import RouterStore from "./stores/Router";
import registerServiceWorker from "./registerServiceWorker";
import GameStore from "./stores/Game";
import StatsStore from "./stores/Stats";
import fixFontRendering from "./utils/fixFontRendering";
import "./index.css";

const routerStore = new RouterStore();
const statsStore = new StatsStore();
const gameStore = new GameStore(routerStore, statsStore);

ReactDOM.render(
  <Provider router={routerStore} game={gameStore} stats={statsStore}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

document.addEventListener("DOMContentLoaded", fixFontRendering);
