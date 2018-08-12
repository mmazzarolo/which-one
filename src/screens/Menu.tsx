import * as React from "react";
import { inject, observer } from "mobx-react";
import { Stores } from "../types/Stores";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import logoImage from "../assets/images/which-one-tagline.png";
import "./Menu.css";

export const MENU_BG_COLOR_1 = "#89C8FE";
export const MENU_BG_COLOR_2 = "#c4e2fc";

interface Props {
  score: number;
  isNavigating: boolean;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  isNavigating: stores.router.isNavigating,
  navigateToPlayground: stores.router.navigateToPlayground
});

class Menu extends React.Component<Props> {
  public render() {
    const { isNavigating, navigateToPlayground } = this.props;
    return (
      <AnimatedBackground
        backgroundColor1={MENU_BG_COLOR_1}
        backgroundColor2={MENU_BG_COLOR_2}
        isExiting={isNavigating}
      >
        <div className="Menu">
          <img src={logoImage} className="Menu-logo" />
          <Button
            label="Play"
            color={MENU_BG_COLOR_1}
            onClick={navigateToPlayground}
            animationDelay={1000}
          />
        </div>
      </AnimatedBackground>
    );
  }
}

export default inject(mapStoresToProps)(observer(Menu));
