import * as React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import Button from "../components/Button";
import Score from "../components/Score";
import "./Result.css";

interface Props {
  score: number;
  primaryColor: string;
  navigateToPlayground: () => void;
  navigateToMenu: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground,
  navigateToMenu: stores.router.navigateToMenu
});

class Result extends React.Component<Props> {
  @observable
  public exiting: boolean = false;

  public handleRetryClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  public handleMenuClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToMenu();
  };

  public render() {
    const { primaryColor, score } = this.props;
    return (
      <div
        className={`Result ${this.exiting ? "Result-exiting" : ""}`}
        style={{ backgroundColor: primaryColor }}
      >
        <Score color={primaryColor} score={score} />
        <div className="Result-buttons">
          <Button
            label="Restart"
            color={primaryColor}
            animationDelay={1000}
            onClick={this.handleRetryClick}
          />
          <div className="Result-buttons-separator" />
          <Button
            label="Menu"
            type="flat"
            color={primaryColor}
            animationDelay={1400}
            onClick={this.handleMenuClick}
          />
        </div>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Result));
