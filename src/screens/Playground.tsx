import * as React from "react";
import { observable, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { take, takeRight } from "lodash";
import AnimatedBackground from "../components/AnimatedBackground";
import Card from "../components/Card";
import CardModel from "../models/Card";
import TimerBar from "../components/TimerBar";
import constants from "../config/constants";
import "./Playground.css";

import { Stores } from "../types/Stores";

export const PLAYGROUND_BG_COLOR_1 = "#eae4de";
export const PLAYGROUND_BG_COLOR_2 = "#eae4de";

interface Props {
  remainingCards: CardModel[];
  swipedCards: CardModel[];
  leftImageId: string;
  rightImageId: string;
  score: number;
  timeLeft: number;
  running: boolean;
  disabled: boolean;
  isNavigating: boolean;
  setupGame: () => void;
  startGame: () => void;
  handleInput: (input: "left" | "right") => Promise<void>;
}

const mapStoresToProps = (stores: Stores) => ({
  remainingCards: toJS(stores.game.remainingCards),
  swipedCards: toJS(stores.game.swipedCards),
  leftImageId: stores.game.leftImageId,
  rightImageId: stores.game.rightImageId,
  score: stores.game.score,
  timeLeft: stores.game.timeLeft,
  running: stores.game.running,
  disabled: stores.game.disabled,
  setupGame: stores.game.setupGame,
  startGame: stores.game.startGame,
  isNavigating: stores.router.isNavigating,
  handleInput: stores.game.handleInput
});

class Playground extends React.Component<Props> {
  @observable
  private isAnimating = true;

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.props.setupGame();
    setTimeout(this.start, constants.INITIAL_ANIMATION_TIME);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  public start = () => {
    this.isAnimating = false;
    this.props.startGame();
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 37) {
      this.props.handleInput("left");
    } else if (event.keyCode === 39) {
      this.props.handleInput("right");
    }
  };

  public handleLeftOverlayTouch = () => {
    this.props.handleInput("left");
  };

  public handleRightOverlayTouch = () => {
    this.props.handleInput("right");
  };

  public renderVisibleSwipedCard = (card: CardModel) => {
    return (
      <Card
        key={card.index}
        position={0}
        imageId={card.imageId}
        swipedDirection={card.swipedDirection}
        valid={null}
      />
    );
  };

  public renderVisibleRemainingCard = (card: CardModel, index: number) => {
    return (
      <Card
        key={card.index}
        position={index}
        imageId={card.imageId}
        swipedDirection={card.swipedDirection}
        valid={card.valid}
        animateEnter={this.isAnimating}
      />
    );
  };

  public render() {
    const {
      isNavigating,
      remainingCards,
      swipedCards,
      leftImageId,
      rightImageId,
      running,
      timeLeft
    } = this.props;
    const visibleRemainingCards = take(remainingCards, 5);
    const visibleSwipedCards = takeRight(swipedCards, 5);
    return (
      <AnimatedBackground
        backgroundColor1={PLAYGROUND_BG_COLOR_1}
        backgroundColor2={PLAYGROUND_BG_COLOR_2}
        isExiting={isNavigating}
      >
        <div className="Playground">
          <div
            className="Playground-touch-overlay-left"
            onTouchStart={this.handleLeftOverlayTouch}
          />
          <div
            className="Playground-touch-overlay-right"
            onTouchStart={this.handleRightOverlayTouch}
          />
          <div className="Playground-header">
            {running && <TimerBar time={timeLeft} />}
          </div>
          <div className="Playground-stack">
            {visibleSwipedCards.map(this.renderVisibleSwipedCard)}
            {visibleRemainingCards.map(this.renderVisibleRemainingCard)}
          </div>
          <div className="Playground-footer">
            <div className="Playground-footer-left-mini-card">
              {running && (
                <Card
                  position={0}
                  imageId={leftImageId}
                  valid={true}
                  mini={true}
                />
              )}
            </div>
            <div className="Playground-footer-right-mini-card">
              {running && (
                <Card
                  position={0}
                  imageId={rightImageId}
                  valid={true}
                  mini={true}
                />
              )}
            </div>
          </div>
        </div>
      </AnimatedBackground>
    );
  }
}

export default inject(mapStoresToProps)(observer(Playground));
