/* @flow */
import { action, observable } from "mobx";

export default class Card {
  @observable index: number;
  @observable imageId: number;
  @observable swipedDirection: "left" | "right";
  @observable valid: ?boolean = null;

  constructor(index: number, imageId: number) {
    this.index = index;
    this.imageId = imageId;
  }

  @action
  swipe = (swipedDirection: "left" | "right") => {
    this.swipedDirection = swipedDirection;
  };

  @action
  swipeLeft = () => {
    this.swipedDirection = "left";
  };

  @action
  swipeRight = () => {
    this.swipedDirection = "right";
  };

  @action
  validate = () => {
    this.valid = true;
  };

  @action
  invalidate = () => {
    this.valid = false;
  };
}
