/* @flow */
import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { take, takeRight } from 'lodash';
import Card from '../components/Card';
import CardModel from '../models/Card';
import utils from '../utils';
import img1 from '../assets/images/1.png';
import './Playground.css';

// const cards = [
//   { backgroundColor: '#3f51b5', image: require('../assets/images/1.png') },
//   { backgroundColor: '#5cc2f1', image: require('../assets/images/2.png') },
//   { backgroundColor: '#fff59d', image: require('../assets/images/3.png') },
//   { backgroundColor: '#9993c1', image: require('../assets/images/4.png') },
//   { backgroundColor: '#e88a63', image: require('../assets/images/5.png') },
//   { backgroundColor: '#91c794', image: require('../assets/images/6.png') },
// ];

import type { GameStatus, Stores } from '../types';

type Props = {
  remainingCards: CardModel[],
  swipedCards: CardModel[],
  score: number,
  disabled: boolean,
  startGame: () => mixed,
  handleInput: ('left' | 'right') => mixed,
};

const mapStoresToProps = (stores: Stores) => ({
  remainingCards: toJS(stores.game.remainingCards),
  swipedCards: toJS(stores.game.swipedCards),
  score: stores.game.score,
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
    score: 0,
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
    switch (event.keyCode) {
      case 37: {
        this.props.handleInput('left');
        break;
      }
      case 39: {
        this.props.handleInput('right');
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { remainingCards, swipedCards } = this.props;
    const visibleRemainingCards = take(remainingCards, 5);
    const visibleSwipedCards = takeRight(swipedCards, 5);
    return (
      <div className={'Playground'}>
        <div className={'Playground-stack'}>
          {visibleSwipedCards.map(x => {
            return (
              <Card
                key={x.index}
                position={0}
                imageId={x.imageId}
                swipedDirection={x.swipedDirection}
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
                onClick={() => null}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
