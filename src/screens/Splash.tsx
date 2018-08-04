import * as React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import "./Splash.css";

interface Props {
  primaryColor: string;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground
});

class Splash extends React.Component<Props> {
  public static defaultProps = {
    primaryColor: "#A6E1DB",
    navigateToPlayground: () => null
  };

  @observable
  public exiting: boolean = false;

  public handleStartClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  public render() {
    const { primaryColor } = this.props;
    return (
      <div className="Splash">
        <div
          className="Splash-start"
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={this.handleStartClick}
        >
          New game
        </div>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Splash));
