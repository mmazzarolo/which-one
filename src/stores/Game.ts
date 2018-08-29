import { action, computed, observable } from "mobx";
import { sample, times } from "lodash";
import Card from "../models/Card";
import RouterStore from "./Router";
import StatsStore from "./Stats";
import constants from "../config/constants";
import delay from "../utils/delay";
import soundService from "../services/soundService";
import getRandomCardDataPair from "../utils/getRandomCardDataPair";

export default class GameStore {
  @observable
  public readonly cards = observable.array<Card>([]);
  @observable
  public running: boolean = false;
  @observable
  public disabled: boolean = false;
  @observable
  public level: number = 0;
  @observable
  public score: number = 0;
  @observable
  public currentCardIndex: number = 0;
  @observable
  public leftImageId: string = "";
  @observable
  public rightImageId: string = "";
  @observable
  public timeLeft: number = 0;

  private routerStore: RouterStore;
  private statsStore: StatsStore;

  constructor(routerStore: RouterStore, statsStore: StatsStore) {
    this.routerStore = routerStore;
    this.statsStore = statsStore;
  }

  @action
  public setupGame = () => {
    this.level = 0;
    this.score = 0;
    this.disabled = true;
    this.timeLeft = constants.TIME_LIMIT_IN_SECONDS;
    const cardDataPair = getRandomCardDataPair();
    const cardIds = cardDataPair.map(x => x.id);
    this.leftImageId = cardIds[0];
    this.rightImageId = cardIds[1];
    const cards: Card[] = [];
    times(999, index => {
      const cardId = sample(cardIds) || "";
      const card = new Card(index, cardId);
      cards.push(card);
    });
    this.cards.replace(cards);
    this.currentCardIndex = 0;
  };

  @action
  public startGame = () => {
    soundService.playGameStartSound();
    this.running = true;
    this.disabled = false;
    const timer = () => {
      this.timeLeft = this.timeLeft - 1;
      if (this.timeLeft <= 0) {
        this.endGame();
        clearInterval(timerInterval);
        return;
      }
    };
    const timerInterval = setInterval(timer, 1000);
  };

  @action
  public endGame = () => {
    this.disabled = true;
    this.running = false;
    this.statsStore.increaseNumOfPlays();
    this.statsStore.setHighScore(this.score);
    this.routerStore.navigateToResult();
  };

  @action
  public handleInput = async (input: "left" | "right") => {
    if (this.disabled) {
      return;
    }
    this.currentCard.swipedDirection = input;
    const inputValid =
      (input === "left" && this.currentCard.imageId === this.leftImageId) ||
      (input === "right" && this.currentCard.imageId === this.rightImageId);
    if (inputValid) {
      soundService.playSwipeSuccessSound();
      this.score += 1;
      this.currentCard.validate();
    } else {
      soundService.playSwipeFailureSound();
      this.currentCard.invalidate();
      this.disabled = true;
      await delay(constants.ERROR_PENALITY_DELAY);
      this.disabled = false;
    }
    this.currentCardIndex = this.currentCardIndex += 1;
  };

  @computed
  get currentCard(): Card {
    return this.cards[this.currentCardIndex];
  }

  @computed
  get remainingCards(): Card[] {
    return this.cards.slice(this.currentCardIndex);
  }

  @computed
  get swipedCards(): Card[] {
    return this.cards.slice(0, this.currentCardIndex);
  }
}
