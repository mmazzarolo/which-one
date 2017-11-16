/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import utils from '../utils';
import './Tile.css';

import type { GameStatus } from '../types';

type Props = {
  status: GameStatus,
  disabled: boolean,
  marked: boolean,
  touched: boolean,
  primaryColor: string,
  accentColor: string,
  onClick: () => mixed,
};

@observer
export default class Splash extends Component<Props> {
  _burstRef: any = null;

  get hinting(): boolean {
    if (this.props.marked) {
      return (
        ['SHOWING_HINTS', 'HIDING_HINTS', 'GIVING_LOST_FEEDBACK'].includes(this.props.status) ||
        this.props.touched
      );
    } else {
      return false;
    }
  }

  get showing(): boolean {
    if (this.props.marked) {
      return [
        'SHOWING_INITIAL_TILES',
        'SHOWING_HINTS',
        'SHOWING_TILES',
        'GIVING_LOST_FEEDBACK',
      ].includes(this.props.status);
    } else {
      return !['HIDING_TILES'].includes(this.props.status);
    }
  }

  get color(): string {
    if (this.props.touched && !this.props.marked) {
      return utils.getDifferentLuminance(this.props.primaryColor, -0.2);
    } else {
      return this.hinting ? this.props.accentColor : this.props.primaryColor;
    }
  }

  render() {
    const { status, disabled, marked, onClick, touched, ...otherProps } = this.props;
    const classNames = [];
    classNames.push(this.showing ? 'Tile-show' : 'Tile-hide');
    classNames.push(this.hinting ? 'Tile-hint' : 'Tile-not-hint');
    classNames.push(touched ? 'Tile-touched' : 'Tile-untouched');
    classNames.push(marked ? 'Tile-marked' : 'Tile-unmarked');
    classNames.push(disabled ? 'Tile-disabled' : 'Tile-enabled');
    const tileShadowBackgroundColor = this.color;
    const tileBackgroundColor = utils.getDifferentLuminance(this.color, 0.2);
    return (
      <div
        className={`Tile ${classNames.join(' ')}`}
        onClick={onClick}
        ref={ref => (this._burstRef = ref)}
      >
        <div className={`Tile-shadow`} style={{ backgroundColor: tileShadowBackgroundColor }} />
        <div className={`Tile-content`} style={{ backgroundColor: tileBackgroundColor }}>
          <div className={`Tile-star`}>{'★'}</div>
        </div>
      </div>
    );
  }
}
