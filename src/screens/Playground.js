/* @flow */
import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { take, takeRight } from 'lodash';
import Card from '../components/Card';
import CardModel from '../models/Card';
import utils from '../utils';
import './Playground.css';

// const cards = [
//   { backgroundColor: '#3f51b5', image: require('../assets/images/1.png') },
//   { backgroundColor: '#5cc2f1', image: require('../assets/images/2.png') },
//   { backgroundColor: '#fff59d', image: require('../assets/images/3.png') },
//   { backgroundColor: '#9993c1', image: require('../assets/images/4.png') },
//   { backgroundColor: '#e88a63', image: require('../assets/images/5.png') },
//   { backgroundColor: '#91c794', image: require('../assets/images/6.png') },
// ];

import type { Stores } from '../types';

type Props = {
  remainingCards: CardModel[],
  swipedCards: CardModel[],
  leftImageId: number,
  rightImageId: number,
  score: number,
  timeLeft: number,
  disabled: boolean,
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
    startGame: () => null,
    handleInput: () => null,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    this.props.startGame();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 37) {
      this.props.handleInput('left');
    } else if (event.keyCode === 39) {
      this.props.handleInput('right');
    }
  };

  render() {
    const { remainingCards, swipedCards, leftImageId, rightImageId, score, timeLeft } = this.props;
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
        <div className={'Playground-header'}>
          <p className={'Playground-score-text'}>{`Score: ${score}`}</p>
          <p className={'Playground-timer-text'}>{`Time: ${timeLeft}`}</p>
        </div>
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
                onClick={() => null}
              />
            );
          })}
        </div>
        <div className={'Playground-left-image-container'}>
          <img src={leftImageSource} alt={''} />
        </div>
        <div className={'Playground-right-image-container'}>
          <img src={rightImageSource} alt={''} />
        </div>
      </div>
    );
  }
}
