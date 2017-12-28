/* @flow */
import { action, observable } from 'mobx';

export default class Card {
  @observable index: number;
  @observable imageId: number;
  @observable swipedDirection: 'left' | 'right';

  constructor(index: number, imageId: number) {
    this.index = index;
    this.imageId = imageId;
  }

  @action
  swipeLeft = () => {
    this.swipedDirection = 'left';
  };

  @action
  swipeRight = () => {
    this.swipedDirection = 'right';
  };
}
