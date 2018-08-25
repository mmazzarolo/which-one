import * as React from "react";
import { inject, observer } from "mobx-react";
import { Stores } from "../types/Stores";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import logoImage from "../assets/images/which-one-logo.png";
import "./Menu.css";

export const MENU_BG_COLOR_1 = "#89C8FE";
export const MENU_BG_COLOR_2 = "#c4e2fc";

interface Props {
  highScore: number;
  isNavigating: boolean;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  highScore: stores.stats.highScore,
  isNavigating: stores.router.isNavigating,
  navigateToPlayground: stores.router.navigateToPlayground
});

class Menu extends React.Component<Props> {
  public render() {
    const { isNavigating, navigateToPlayground, highScore } = this.props;
    return (
      <AnimatedBackground
        backgroundColor1={MENU_BG_COLOR_1}
        backgroundColor2={MENU_BG_COLOR_2}
        isExiting={isNavigating}
      >
        <div className="Menu">
          <img src={logoImage} className="Menu-logo" />
          <div className="Menu-bottom">
            <Button
              label="Play"
              color={MENU_BG_COLOR_1}
              onClick={navigateToPlayground}
              animationDelay={1000}
            />
            {highScore > 0 && (
              <p className="Menu-score">{`High score: ${highScore}`}</p>
            )}
          </div>
        </div>
      </AnimatedBackground>
    );
  }
}

export default inject(mapStoresToProps)(observer(Menu));
