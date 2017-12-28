/* @flow */
import { action, autorun, computed, observable, toJS } from 'mobx';
import { random, sample, times } from 'lodash';
import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.png';
import Card from '../models/Card';
import constants from '../config/constants';
import utils from '../utils';
import RouterStore from './Router';

import type { GameStatus } from '../types';

const NUMBER_OF_VISIBLE_CARDS = 3;

export default class GameStore {
  routerStore: RouterStore;

  @observable cards: Card[] = [];
  @observable running: boolean = false;
  @observable valid: boolean = false;
  @observable disabled: boolean = false;
  @observable level: number = 0;
  @observable score: number = 0;
  @observable currentCardIndex: number = 0;
  @observable leftImageId: number = 0;
  @observable rightImageId: number = 1;

  constructor(routerStore: RouterStore) {
    this.routerStore = routerStore;
  }

  @action
  startGame = async () => {
    console.log('asdf');
    this.level = 0;
    this.score = 0;
    this.running = true;
    this.valid = true;
    this.disabled = false;
    const cards = [];
    times(99, index => {
      const imageId = random(0, 1);
      const card = new Card(index, imageId);
      cards.push(card);
    });
    // $FlowFixMe
    this.cards.replace(cards);
    this.currentCardIndex = 0;
  };

  @action
  handleInput = (input: 'left' | 'right') => {
    if (input === 'left') {
      if (this.currentCard.imageId === this.leftImageId) {
        console.log('OK');
        this.score += 1;
      } else {
        console.warn('KO');
      }
      this.currentCard.swipeLeft();
    } else if (input === 'right') {
      if (this.currentCard.imageId === this.rightImageId) {
        console.log('OK');
        this.score += 1;
      } else {
        console.warn('KO');
      }
      this.currentCard.swipeRight();
    }
    this.currentCardIndex = this.currentCardIndex += 1;
  };

  @computed
  get currentCard(): Card {
    return this.cards[this.currentCardIndex];
  }

  @computed
  get remainingCards(): Card[] {
    return this.cards.slice(this.currentCardIndex);
  }

  @computed
  get swipedCards(): Card[] {
    return this.cards.slice(0, this.currentCardIndex);
  }
}
