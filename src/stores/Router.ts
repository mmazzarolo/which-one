import { action, observable } from "mobx";
import { Screen } from "../types/Screen";
import constants from "../config/constants";

export default class RouterStore {
  @observable
  public currentScreen: Screen = constants.INITIAL_SCREEN;

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
