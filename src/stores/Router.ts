import { action, observable } from "mobx";
import { Screen } from "../types/Screen";

export default class RouterStore {
  @observable
  public currentScreen: Screen = "PLAYGROUND";

  @action
  public navigateToSplash = () => {
    this.currentScreen = "SPLASH";
  };
  @action
  public navigateToPlayground = () => {
    this.currentScreen = "PLAYGROUND";
  };
  @action
  public navigateToScore = () => {
    this.currentScreen = "SCORE";
  };
}
