/* @flow */
/* eslint-disable import/first */
import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Tile from '../components/Tile';
import TileModel from '../models/Tile';
import utils from '../utils';
import img1 from '../assets/images/1.png';
import './Playground.css';

const cards = [
  { backgroundColor: '#3f51b5', image: require('../assets/images/1.png') },
  { backgroundColor: '#5cc2f1', image: require('../assets/images/2.png') },
  { backgroundColor: '#fff59d', image: require('../assets/images/3.png') },
  { backgroundColor: '#9993c1', image: require('../assets/images/4.png') },
  { backgroundColor: '#e88a63', image: require('../assets/images/5.png') },
  { backgroundColor: '#91c794', image: require('../assets/images/6.png') },
];

import type { GameStatus, Stores } from '../types';

type Props = {
  board: TileModel[][],
  status: GameStatus,
  score: number,
  disabled: boolean,
  primaryColor: string,
  accentColor: string,
  startGame: () => mixed,
  handleTileClick: number => mixed,
};

const mapStoresToProps = (stores: Stores) => ({
  board: toJS(stores.game.board),
  status: stores.game.status,
  score: stores.game.score,
  disabled: stores.game.disabled,
  startGame: stores.game.startGame,
  primaryColor: stores.game.primaryColor,
  accentColor: stores.game.accentColor,
  handleTileClick: stores.game.handleTileClick,
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    board: [],
    status: 'SHOWING_INITIAL_TILES',
    score: 0,
    disabled: false,
    primaryColor: 'blue',
    accentColor: 'red',
    startGame: () => null,
    handleTileClick: () => null,
  };

  @observable currentCard: number = 0;

  render() {
    return (
      <div className={'Playground'}>
        <div className={'Playground-stack'}>
          {cards.map((x, index) => {
            const currentClassName = this.currentCard === index ? 'Playground-card-current' : '';
            const hidingClassName = this.currentCard === index + 1 ? 'Playground-card-hiding' : '';
            return (
              <div
                key={x.backgroundColor}
                className={`Playground-card ${currentClassName} ${hidingClassName}`}
                style={{ backgroudColor: x.backgroundColor }}
                onClick={() => (this.currentCard = index + 1)}
              >
                <img src={x.image} />
              </div>
            );
          })}
        </div>
      </div>
    );

    // return (
    //   <div className={'Playground'}>
    //     <div className={'Playground-score'}>
    //       <div className="card-stack">

    //         <input id="card-8" name="card-set" type="radio" />
    //         <div className="card">
    //           <div className="content">
    //             <h2>Step 8</h2>
    //             <p>Write more CSS to cover up your already bad CSS.</p>
    //             <label htmlFor="card-0">Start Over</label>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
