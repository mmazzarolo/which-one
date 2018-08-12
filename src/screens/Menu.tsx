import * as React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import Button from "../components/Button";
import logoImage from "../assets/images/which-one-tagline.png";
import "./Menu.css";

interface Props {
  score: number;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
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
    return (
      <div className={`Menu ${this.exiting ? "Menu-exiting" : ""}`}>
        <div className="Menu-body">
          <img src={logoImage} className="Menu-logo"/>
          <Button
            label="Play"
            color={"#89C8FE"}
            onClick={this.handlePlayClick}
            animationDelay={1000}
          />
        </div>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Menu));
