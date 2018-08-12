import { action, observable } from "mobx";
import { Screen } from "../types/Screen";
import constants from "../config/constants";
import delay from "../utils/delay";
import { MENU_BG_COLOR_1, MENU_BG_COLOR_2 } from "../screens/Menu";
import {
  PLAYGROUND_BG_COLOR_1,
  PLAYGROUND_BG_COLOR_2
} from "../screens/Playground";
import { RESULT_BG_COLOR_1, RESULT_BG_COLOR_2 } from "../screens/Result";

export default class RouterStore {
  @observable
  public currentScreen: Screen = constants.INITIAL_SCREEN;
  @observable
  public currentScreenBackgroundColor1: string = MENU_BG_COLOR_1;
  @observable
  public currentScreenBackgroundColor2: string = MENU_BG_COLOR_2;
  @observable
  public isNavigating: boolean = false;

  @action
  public navigateToMenu = () => {
    this.navigateTo("MENU", MENU_BG_COLOR_1, MENU_BG_COLOR_2);
  };

  @action
  public navigateToPlayground = () => {
    this.navigateTo("PLAYGROUND", PLAYGROUND_BG_COLOR_1, PLAYGROUND_BG_COLOR_2);
  };

  @action
  public navigateToResult = () => {
    this.navigateTo("RESULT", RESULT_BG_COLOR_1, RESULT_BG_COLOR_2);
  };

  private navigateTo = async (
    screen: Screen,
    backgroundColor1: string,
    backgroundColor2: string
  ) => {
    this.isNavigating = true;
    this.currentScreenBackgroundColor1 = backgroundColor1;
    this.currentScreenBackgroundColor2 = backgroundColor2;
    await delay(500);
    this.currentScreen = screen;
    this.isNavigating = false;
  };
}
