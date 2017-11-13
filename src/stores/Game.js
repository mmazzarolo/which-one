/* @flow */
import { action, autorun, computed, observable } from 'mobx';
import { times } from 'lodash';
import Tile from '../models/Tile';
import constants from '../config/constants';
import utils from '../utils';

import type { GameStatus } from '../types';

export default class GameStore {
  @observable tiles: Tile[] = [];
  @observable status: GameStatus = 'SHOWING_INITIAL_TILES';
  @observable running: boolean = false;
  @observable valid: boolean = false;
  @observable disabled: boolean = false;
  @observable level: number = 0;
  @observable score: number = 0;

  constructor() {
    autorun(() => {
      console.log('status: ', this.status);
    });
  }

  @action
  startGame = async () => {
    // Called on every round start (round, not game): it builds the board's tiles
    this.level = 1;
    this.score = 0;
    this.running = true;
    this.disabled = true;
    this.valid = true;
    // $FlowFixMe
    this.tiles.clear();
    const tiles = [];
    times(this.numberOfTiles, n => {
      const id = n;
      const row = Math.floor(n / this.boardSize);
      const col = n % this.boardSize;
      const marked = Math.random() >= 0.5;
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
    this.disabled = false;
  };

  @action
  handleTileClick = async (tileId: number) => {
    const tile = this.tiles[tileId];
    if (tile) {
      tile.touch();
    }
  };

  @computed
  get boardSize(): number {
    return this.level + 3;
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
}
