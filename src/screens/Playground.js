/* @flow */
import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { take, takeRight } from "lodash";
import Card from "../components/Card";
import CardModel from "../models/Card";
import getCardData from "../utils/getCardData";
import Timer from "../components/Timer";
import constants from "../config/constants";
import "./Playground.css";

import type { Stores } from "../types/Stores";

type Props = {
  remainingCards: CardModel[],
  swipedCards: CardModel[],
  leftImageId: number,
  rightImageId: number,
  score: number,
  timeLeft: number,
  disabled: boolean,
  primaryColor: string,
  startGame: () => mixed,
  handleInput: ("left" | "right") => mixed
};

const mapStoresToProps = (stores: Stores) => ({
  remainingCards: toJS(stores.game.remainingCards),
  swipedCards: toJS(stores.game.swipedCards),
  leftImageId: stores.game.leftImageId,
  rightImageId: stores.game.rightImageId,
  score: stores.game.score,
  timeLeft: stores.game.timeLeft,
  disabled: stores.game.disabled,
  primaryColor: stores.game.primaryColor,
  startGame: stores.game.startGame,
  handleInput: stores.game.handleInput
});

@inject(mapStoresToProps)
@observer
export default class Playground extends Component<Props> {
  static defaultProps = {
    remainingCards: [],
    swipedCards: [],
    leftImageId: 0,
    rightImageId: 0,
    score: 0,
    timeLeft: 0,
    disabled: false,
    primaryColor: "#3f51b5",
    startGame: () => null,
    handleInput: () => null
  };

  @observable isAnimating = true;

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.props.startGame();
    setTimeout(this.stopAnimating, constants.INITIAL_ANIMATION_TIME);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  stopAnimating = () => {
    this.isAnimating = false;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 37) {
      this.props.handleInput("left");
    } else if (event.keyCode === 39) {
      this.props.handleInput("right");
    }
  };

  handleLeftOverlayTouch = () => {
    this.props.handleInput("left");
  };

  handleRightOverlayTouch = () => {
    this.props.handleInput("right");
  };

  renderVisibleSwipedCard = (card: CardModel) => {
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

  renderVisibleRemainingCard = (card: CardModel, index: number) => {
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

  render() {
    const {
      remainingCards,
      swipedCards,
      leftImageId,
      rightImageId,
      score,
      timeLeft,
      primaryColor
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
          <Timer time={timeLeft} />
        </div>
        <div className="Playground-stack">
          {visibleSwipedCards.map(this.renderVisibleSwipedCard)}
          {visibleRemainingCards.map(this.renderVisibleRemainingCard)}
        </div>
        <div className="Playground-footer">
          <div className="Playground-footer-left-mini-card">
            <Card position={0} imageId={leftImageId} valid mini />
          </div>
          <div className="Playground-footer-right-mini-card">
            <Card position={0} imageId={rightImageId} valid mini />
          </div>
        </div>
      </div>
    );
  }
}
