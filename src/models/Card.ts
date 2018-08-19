import { action, observable } from "mobx";

export default class Card {
  @observable
  public index: number;
  @observable
  public imageId: string;
  @observable
  public swipedDirection: "left" | "right";
  @observable
  public valid: boolean | null = null;

  constructor(index: number, imageId: string) {
    this.index = index;
    this.imageId = imageId;
  }

  @action
  public swipe = (swipedDirection: "left" | "right") => {
    this.swipedDirection = swipedDirection;
  };

  @action
  public swipeLeft = () => {
    this.swipedDirection = "left";
  };

  @action
  public swipeRight = () => {
    this.swipedDirection = "right";
  };

  @action
  public validate = () => {
    this.valid = true;
  };

  @action
  public invalidate = () => {
    this.valid = false;
  };
}
