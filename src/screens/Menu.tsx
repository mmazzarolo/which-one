import * as React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import logoImage from "../assets/images/transfer.svg";
import Button from "../components/Button";
import "./Menu.css";

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

class Menu extends React.Component<Props> {
  @observable
  public exiting: boolean = false;

  public handlePlayClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  public render() {
    const { primaryColor } = this.props;
    return (
      <div
        className={`Menu ${this.exiting ? "Menu-exiting" : ""}`}
        style={{ backgroundColor: primaryColor }}
      >
        <div className="Menu-body">
          <div className="Menu-logo">
            <img src={logoImage} />
            <p>Quickey</p>
          </div>
          <Button
            label="Play"
            color={primaryColor}
            onClick={this.handlePlayClick}
            animationDelay={1000}
          />
        </div>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Menu));
