/* @flow */
import { action, observable } from "mobx";
import type { Screen } from "../types/Screen";

export default class RouterStore {
  @observable currentScreen: Screen = "PLAYGROUND";

  @action navigateToSplash = () => (this.currentScreen = "SPLASH");
  @action navigateToPlayground = () => (this.currentScreen = "PLAYGROUND");
  @action navigateToScore = () => (this.currentScreen = "SCORE");
}
