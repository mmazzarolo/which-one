/* @flow */
import { action, observable } from 'mobx';

export type Screen = 'SPLASH' | 'PLAYGROUND' | 'SCORE';

export default class RouterStore {
  @observable currentScreen: Screen = 'PLAYGROUND';

  @action navigateToSplash = () => (this.currentScreen = 'SPLASH');
  @action navigateToPlayground = () => (this.currentScreen = 'PLAYGROUND');
  @action navigateToScore = () => (this.currentScreen = 'SCORE');
}
