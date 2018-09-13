import * as React from "react";
import { inject, observer } from "mobx-react";
import { Stores } from "../types/Stores";
import AnimatedBackground from "../components/AnimatedBackground";
import Button from "../components/Button";
import Confetti from "../components/Confetti";
import Score from "../components/Score";
import newRecordImage from "../assets/images/new-record.png";
import "./Result.css";

export const RESULT_BG_COLOR_1 = "#D44D5C";
export const RESULT_BG_COLOR_2 = "#fc7987";

interface Props {
  score: number;
  hasHighScored: boolean;
  isNavigating: boolean;
  navigateToPlayground: () => void;
  navigateToMenu: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  hasHighScored: stores.stats.hasHighScored,
  isNavigating: stores.router.isNavigating,
  navigateToPlayground: stores.router.navigateToPlayground,
  navigateToMenu: stores.router.navigateToMenu
});

class Result extends React.Component<Props> {
  public render() {
    const {
      score,
      hasHighScored,
      isNavigating,
      navigateToMenu,
      navigateToPlayground
    } = this.props;
    return (
      <AnimatedBackground
        backgroundColor1={RESULT_BG_COLOR_1}
        backgroundColor2={RESULT_BG_COLOR_2}
        isExiting={isNavigating}
      >
        {hasHighScored && <Confetti />}
        <div className="Result">
          <div>
            {!hasHighScored && (
              <img src={newRecordImage} className="Result-new-record-image" />
            )}
            <Score color={RESULT_BG_COLOR_1} score={score} />
          </div>
          <div className="Result-buttons">
            <Button
              label="Restart"
              color={RESULT_BG_COLOR_1}
              animationDelay={1000}
              onClick={navigateToPlayground}
            />
            <div className="Result-buttons-separator" />
            <Button
              label="Menu"
              type="flat"
              color={RESULT_BG_COLOR_1}
              animationDelay={1400}
              onClick={navigateToMenu}
            />
          </div>
        </div>
      </AnimatedBackground>
    );
  }
}

export default inject(mapStoresToProps)(observer(Result));
