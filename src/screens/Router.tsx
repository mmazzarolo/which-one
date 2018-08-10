import * as React from "react";
import { inject, observer } from "mobx-react";
import Splash from "./Splash";
import Playground from "./Playground";
import Menu from "./Menu";
import Score from "./Score";
import { Stores } from "../types/Stores";
import { Screen } from "../types/Screen";
import "./Router.css";

interface Props {
  currentScreen: Screen;
}

const mapStoresToProps = (stores: Stores) => ({
  currentScreen: stores.router.currentScreen
});

class Router extends React.Component<Props> {
  public render() {
    let content;
    switch (this.props.currentScreen) {
      case "MENU":
        content = <Menu />;
        break;
      case "SPLASH":
        content = <Splash />;
        break;
      case "PLAYGROUND":
        content = <Playground />;
        break;
      case "SCORE":
        content = <Score />;
        break;
      default:
        content = <div />;
        break;
    }
    return <div className="Router">{content}</div>;
  }
}

export default inject(mapStoresToProps)(observer(Router));
