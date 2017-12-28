/* @flow */
import { action, computed, observable } from 'mobx';
import { sample, times } from 'lodash';
import Card from '../models/Card';
import RouterStore from './Router';
import utils from '../utils';

export default class GameStore {
  routerStore: RouterStore;

  @observable cards: Card[] = [];
  @observable running: boolean = false;
  @observable disabled: boolean = false;
  @observable level: number = 0;
  @observable score: number = 0;
  @observable currentCardIndex: number = 0;
  @observable leftImageId: number = 0;
  @observable rightImageId: number = 0;
  @observable timeLeft: number = 0;

  constructor(routerStore: RouterStore) {
    this.routerStore = routerStore;
  }

  @action
  startGame = async () => {
    this.level = 0;
    this.score = 0;
    this.running = true;
    this.disabled = false;
    const imageIds = utils.multiRandom(1, 8, 2);
    this.leftImageId = imageIds[0];
    this.rightImageId = imageIds[1];
    const cards = [];
    times(99, index => {
      const imageId = sample(imageIds);
      const card = new Card(index, imageId);
      cards.push(card);
    });
    // $FlowFixMe
    this.cards.replace(cards);
    this.currentCardIndex = 0;
    this.timeLeft = 30;
    const timer = () => {
      this.timeLeft = this.timeLeft - 1;
      if (this.timeLeft <= 0) {
        clearInterval(timerInterval);
        this.routerStore.navigateToScore();
        return;
      }
    };
    const timerInterval = setInterval(timer, 1000);
  };

  @action
  handleInput = async (input: 'left' | 'right') => {
    if (this.disabled) return;
    this.currentCard.swipedDirection = input;
    const inputValid =
      (input === 'left' && this.currentCard.imageId === this.leftImageId) ||
      (input === 'right' && this.currentCard.imageId === this.rightImageId);
    if (inputValid) {
      this.score += 1;
      this.currentCard.validate();
    } else {
      console.warn('KO');
      this.currentCard.invalidate();
      this.disabled = true;
      await utils.delay(1000);
      this.disabled = false;
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
