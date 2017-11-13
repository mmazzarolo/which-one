/* @flow */
import { action, observable } from 'mobx';

export default class Tile {
  @observable id: number;
  @observable row: number;
  @observable col: number;
  @observable marked: boolean = false;
  @observable touched: boolean = false;

  constructor(id: number, row: number, col: number, marked: boolean) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.marked = marked;
  }

  @action
  touch = () => {
    this.touched = true;
  };
}
