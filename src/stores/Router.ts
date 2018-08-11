import { action, observable } from "mobx";
import { Screen } from "../types/Screen";
import constants from "../config/constants";

export default class RouterStore {
  @observable
  public currentScreen: Screen = constants.INITIAL_SCREEN;

  @action
  public navigateToMenu = () => {
    this.currentScreen = "MENU";
  };
  @action
  public navigateToSplash = () => {
    this.currentScreen = "SPLASH";
  };
  @action
  public navigateToPlayground = () => {
    this.currentScreen = "PLAYGROUND";
  };
  @action
  public navigateToResult = () => {
    this.currentScreen = "RESULT";
  };
}
