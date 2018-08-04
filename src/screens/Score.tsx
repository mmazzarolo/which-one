import * as React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import "./Score.css";

interface Props {
  score: number;
  primaryColor: string;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground
});

class Splash extends React.Component<Props> {
  @observable
  public exiting: boolean = false;

  public handleRetryClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  public render() {
    const { primaryColor } = this.props;
    return (
      <div
        className={`Score ${this.exiting ? "Score-exiting" : ""}`}
        style={{ backgroundColor: primaryColor }}
      >
        <p className="Score-label">Score: </p>
        <p className="Score-points" style={{ color: primaryColor }}>
          {this.props.score}
        </p>
        <div
          className="Score-retry"
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={this.handleRetryClick}
        >
          Restart
        </div>
        <div className="Score-menu" onClick={this.handleRetryClick}>
          Menu
        </div>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Splash));
