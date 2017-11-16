/* @flow */
import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Tile from '../components/Tile';
import TileModel from '../models/Tile';
import './Playground.css';

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

  componentDidMount() {
    this.props.startGame();
  }

  render() {
    const { board, handleTileClick, status, disabled, primaryColor, accentColor } = this.props;
    const boardCells = board.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        const tile = col;
        return (
          <Tile
            key={`Tile-${tile.id}`}
            marked={tile.marked}
            touched={tile.touched}
            status={status}
            disabled={disabled}
            primaryColor={primaryColor}
            accentColor={accentColor}
            onClick={e => handleTileClick(tile.id)}
          />
        );
      });
    });

    return (
      <div className={'Playground'}>
        <div className={'Playground-board'}>
          {boardCells.map((row, rowIndex) => {
            return (
              <div className={'Playground-board-row'} key={`Playground-board-row-${rowIndex}`}>
                {row}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
