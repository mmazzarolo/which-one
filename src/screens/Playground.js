/* @flow */
import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { take, takeRight } from 'lodash';
import Card from '../components/Card';
import CardModel from '../models/Card';
import utils from '../utils';
import './Playground.css';

import type { Stores } from '../types';

const INITIAL_ANIMATION_TIME = 1200;

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
  handleInput: ('left' | 'right') => mixed,
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
  handleInput: stores.game.handleInput,
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
    primaryColor: '#3f51b5',
    startGame: () => null,
    handleInput: () => null,
  };

  @observable isAnimating = true;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    this.props.startGame();
    setTimeout(this.stopAnimating, INITIAL_ANIMATION_TIME);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  stopAnimating = () => {
    this.isAnimating = false;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 37) {
      this.props.handleInput('left');
    } else if (event.keyCode === 39) {
      this.props.handleInput('right');
    }
  };

  render() {
    const {
      remainingCards,
      swipedCards,
      leftImageId,
      rightImageId,
      score,
      timeLeft,
      primaryColor,
    } = this.props;
    const visibleRemainingCards = take(remainingCards, 5);
    const visibleSwipedCards = takeRight(swipedCards, 5);
    const leftImageSource = utils.getImageSourceById(leftImageId);
    const rightImageSource = utils.getImageSourceById(rightImageId);
    return (
      <div className={'Playground'}>
        <div
          className={'Playground-touch-overlay-left'}
          onTouchStart={() => this.props.handleInput('left')}
        />
        <div
          className={'Playground-touch-overlay-right'}
          onTouchStart={() => this.props.handleInput('right')}
        />
        {/* <div className={'Playground-header'}>
          <p
            className={'Playground-score-text'}
            style={{ color: primaryColor, borderColor: primaryColor }}
          >{`Score: ${score}`}</p>
          <p
            className={'Playground-timer-text'}
            style={{ color: primaryColor, borderColor: primaryColor }}
          >{`Time: ${timeLeft}`}</p>
        </div> */}
        <div className={'Playground-stack'}>
          {visibleSwipedCards.map(x => {
            return (
              <Card
                key={x.index}
                position={0}
                imageId={x.imageId}
                swipedDirection={x.swipedDirection}
                valid={null}
                onClick={() => null}
              />
            );
          })}
          {visibleRemainingCards.map((x, index) => {
            return (
              <Card
                key={x.index}
                position={index}
                imageId={x.imageId}
                swipedDirection={x.swipedDirection}
                valid={x.valid}
                animateEnter={this.isAnimating}
                onClick={() => null}
              />
            );
          })}
        </div>
        <div className={'Playground-footer'}>
          <div className={'Playground-left-image-container'}>
            <img src={leftImageSource} alt={''} />
          </div>
          <div className={'Playground-right-image-container'}>
            <img src={rightImageSource} alt={''} />
          </div>
        </div>
      </div>
    );
  }
}
