/* @flow */
import React, { Component } from "react";
import Splash from "./Splash";
import { inject, observer } from "mobx-react";
import Playground from "./Playground";
import Score from "./Score";
import "./Router.css";

import type { Stores } from "../types/Stores";

type Props = {
  currentScreen: string
};

const mapStoresToProps = (stores: Stores) => ({
  currentScreen: stores.router.currentScreen
});

@inject(mapStoresToProps)
@observer
export default class Root extends Component<Props> {
  render() {
    let content;
    switch (this.props.currentScreen) {
      case "SPLASH":
        // $FlowFixMe
        content = <Splash />;
        break;
      case "PLAYGROUND":
        // $FlowFixMe
        content = <Playground />;
        break;
      case "SCORE":
        // $FlowFixMe
        content = <Score />;
        break;
      default:
        content = <div />;
        break;
    }
    return <div className="Router">{content}</div>;
  }
}
