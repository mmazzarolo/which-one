import RouterStore from "../stores/Router";
import GameStore from "../stores/Game";
import StatsStore from "../stores/Stats";

export interface Stores {
  router: RouterStore;
  game: GameStore;
  stats: StatsStore;
}
