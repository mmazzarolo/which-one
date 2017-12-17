/* @flow */
import { action, autorun, computed, observable } from 'mobx';
import { range, sampleSize, times } from 'lodash';
import Tile from '../models/Tile';
import constants from '../config/constants';
import utils from '../utils';
import RouterStore from './Router';

import type { GameStatus } from '../types';

export default class GameStore {
  routerStore: RouterStore;

  @observable tiles: Tile[] = [];
  @observable status: GameStatus = 'SHOWING_INITIAL_TILES';
  @observable running: boolean = false;
  @observable valid: boolean = false;
  @observable disabled: boolean = false;
  @observable level: number = 0;
  @observable score: number = 0;

  constructor(routerStore: RouterStore) {
    autorun(() => {
      console.log('status: ', this.status);
    });
    this.routerStore = routerStore;
  }

  @action
  startGame = async () => {
    this.level = 0;
    this.score = 0;
    this.running = true;
    this.valid = true;
    this.startRound();
  };

  @action
  startRound = async () => {
    this.status = 'SHOWING_INITIAL_TILES';
    this.level++;
    this.disabled = true;
    // $FlowFixMe
    this.tiles.clear();
    const tiles = [];
    const markedTilesIndexes = sampleSize(range(this.numberOfTiles), this.numberOfMarkedTiles);
    times(this.numberOfTiles, n => {
      const id = n;
      const row = Math.floor(n / this.boardSize);
      const col = n % this.boardSize;
      const marked = markedTilesIndexes.includes(n);
      const tile = new Tile(id, row, col, marked);
      tiles.push(tile);
    });
    // $FlowFixMe
    this.tiles.replace(tiles);
    await utils.delay(500);
    this.status = 'HIDING_INITIAL_TILES';
    await utils.delay(300);
    this.status = 'SHOWING_HINTS';
    await utils.delay(600);
    this.status = 'HIDING_HINTS';
    await utils.delay(300);
    this.status = 'SHOWING_TILES';
    await utils.delay(100);
    this.disabled = false;
  };

  @action
  handleTileClick = async (tileId: number) => {
    const tile = this.tiles[tileId];
    if (tile) {
      tile.touch();
      if (tile.marked) {
        this.score += 1;
        if (this.markedTilesLeft.length === 0) {
          this.disabled = true;
          this.status = 'GIVING_WIN_FEEDBACK';
          await utils.delay(500);
          this.status = 'HIDING_TILES';
          await utils.delay(500);
          this.startRound();
        }
      } else {
        this.valid = false;
        this.disabled = true;
        this.status = 'GIVING_LOST_FEEDBACK';
        await utils.delay(1000);
        this.status = 'HIDING_TILES';
        await utils.delay(1000);
        this.routerStore.navigateToScore();
      }
    }
  };

  @computed
  get numberOfMarkedTiles(): number {
    if (this.level + 2 <= 10) {
      return this.level + 2;
    } else {
      return 10;
    }
  }

  @computed
  get boardSize(): number {
    switch (this.numberOfMarkedTiles) {
      case 3:
        return 3;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 4;
      case 7:
        return 4;
      case 8:
        return 5;
      case 9:
        return 5;
      case 10:
        return 5;
      default:
        return 6;
    }
  }

  @computed
  get board(): Tile[][] {
    return utils.listToMatrix(this.tiles, this.boardSize);
  }

  @computed
  get markedTilesLeft(): Tile[] {
    return this.tiles.filter(x => x.marked && !x.touched);
  }

  @computed
  get numberOfTiles(): number {
    return Math.pow(this.boardSize, 2);
  }

  @computed
  get primaryColor(): string {
    return '#3498db';
    // return '#5438DC';
    // return '#44AF69';
    // return '#0E7C7B';
  }

  @computed
  get accentColor(): string {
    return '#EA4258';
    // return '#ADBDFF';
    // return '#FCAB10';
    // return '#FDE74C';
  }
}
