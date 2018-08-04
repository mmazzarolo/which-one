import * as React from "react";
import { observable, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { take, takeRight } from "lodash";
import Card from "../components/Card";
import CardModel from "../models/Card";
import Timer from "../components/Timer";
import constants from "../config/constants";
import "./Playground.css";

import { Stores } from "../types/Stores";

interface Props {
  remainingCards: CardModel[];
  swipedCards: CardModel[];
  leftImageId: number;
  rightImageId: number;
  score: number;
  timeLeft: number;
  running: boolean;
  disabled: boolean;
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
          <div />
          {running && <Timer time={timeLeft} />}
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
    );
  }
}

export default inject(mapStoresToProps)(observer(Playground));
