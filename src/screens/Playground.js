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
  running: boolean,
  disabled: boolean,
  primaryColor: string,
  setupGame: () => mixed,
  startGame: () => mixed,
  handleInput: ("left" | "right") => mixed
};

const mapStoresToProps = (stores: Stores) => ({
  remainingCards: toJS(stores.game.remainingCards),
  swipedCards: toJS(stores.game.swipedCards),
  leftImageId: stores.game.leftImageId,
  rightImageId: stores.game.rightImageId,
  timeLeft: stores.game.timeLeft,
  running: stores.game.running,
  disabled: stores.game.disabled,
  setupGame: stores.game.setupGame,
  startGame: stores.game.startGame,
  handleInput: stores.game.handleInput
});

@inject(mapStoresToProps)
@observer
export default class Playground extends Component<Props> {
  @observable isAnimating = true;

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.props.setupGame();
    setTimeout(this.start, constants.INITIAL_ANIMATION_TIME);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  start = () => {
    this.isAnimating = false;
    this.props.startGame();
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
            {running && <Card position={0} imageId={leftImageId} valid mini />}
          </div>
          <div className="Playground-footer-right-mini-card">
            {running && <Card position={0} imageId={rightImageId} valid mini />}
          </div>
        </div>
      </div>
    );
  }
}
