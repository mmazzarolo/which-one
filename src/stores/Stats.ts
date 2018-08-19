import { action, observable, autorun } from "mobx";
import storageService from "../services/storageService";

export default class StatsStore {
  @observable
  public numOfPlays: number = 0;
  @observable
  public highScore: number = 0;

  constructor() {
    this.rehydrateStore();
    autorun(this.persistStore);
  }

  @action
  public increaseNumOfPlays = () => {
    this.numOfPlays++;
  };

  @action
  public setHighScore = (score: number) => {
    if (score > this.highScore) {
      this.highScore = score;
    }
  };

  private rehydrateStore = () => {
    const storedNumOfPlays = storageService.getItem("stats.NUM_OF_PLAYS");
    this.numOfPlays = storedNumOfPlays ? parseInt(storedNumOfPlays, 10) : 0;
    const storedHightScore = storageService.getItem("stats.HIGH_SCORE");
    this.highScore = storedHightScore ? parseInt(storedHightScore, 10) : 0;
  };

  private persistStore = () => {
    storageService.setItem("stats.NUM_OF_PLAYS", this.numOfPlays.toString());
    storageService.setItem("stats.HIGH_SCORE", this.highScore.toString());
  };
}
