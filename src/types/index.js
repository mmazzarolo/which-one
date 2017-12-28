/* @flow */
import type RouterStore from '../stores/Router';
import type GameStore from '../stores/Game';
// import type TileModel from '../models/Tile';

export type Stores = {
  router: RouterStore,
  game: GameStore,
};

// export type Card = TileModel;

export type GameStatus =
  | 'SHOWING_INITIAL_TILES'
  | 'HIDING_INITIAL_TILES'
  | 'SHOWING_HINTS'
  | 'HIDING_HINTS'
  | 'SHOWING_TILES'
  | 'RUNNING'
  | 'HIDING_TILES'
  | 'GIVING_WIN_FEEDBACK'
  | 'GIVING_LOST_FEEDBACK';
