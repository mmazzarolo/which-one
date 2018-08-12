import * as React from "react";
import { inject, observer } from "mobx-react";
import Playground from "./Playground";
import Menu from "./Menu";
import Result from "./Result";
import AnimatedBackground from "../components/AnimatedBackground";
import { Stores } from "../types/Stores";
import { Screen } from "../types/Screen";
import "./Router.css";

interface Props {
  currentScreen: Screen;
  backgroundColor1: string;
  backgroundColor2: string;
}

const mapStoresToProps = (stores: Stores) => ({
  currentScreen: stores.router.currentScreen,
  backgroundColor1: stores.router.currentScreenBackgroundColor1,
  backgroundColor2: stores.router.currentScreenBackgroundColor2
});

class Router extends React.Component<Props> {
  public render() {
    const { currentScreen, backgroundColor1, backgroundColor2 } = this.props;
    let content;
    switch (currentScreen) {
      case "MENU":
        content = <Menu />;
        break;
      case "PLAYGROUND":
        content = <Playground />;
        break;
      case "RESULT":
        content = <Result />;
        break;
      default:
        content = <div />;
        break;
    }
    return (
      <AnimatedBackground
        backgroundColor1={backgroundColor1}
        backgroundColor2={backgroundColor2}
      >
        {content}
      </AnimatedBackground>
    );
  }
}

export default inject(mapStoresToProps)(observer(Router));
