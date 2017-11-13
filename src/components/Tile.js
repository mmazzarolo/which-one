/* @flow */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
// import mojs from 'mo-js';
import utils from '../utils';
import './Tile.css';

import type { GameStatus } from '../types';

type Props = {
  status: GameStatus,
  disabled: boolean,
  marked: boolean,
  touched: boolean,
  onClick: () => mixed,
};

@observer
export default class Splash extends Component<Props> {
  _burstRef: any = null;

  // componentWillMount() {
  //   this._animate();
  // }

  // componentWillReceiveProps(nextProps: Props) {
  //   if (this.props.marked && !this.props.touched && nextProps.touched) {
  //     this.content = '★';
  //     this.foregroundColor = FOREGROUND_COLOR_2;
  //     this.backgroundColor = getDifferentLuminance(FOREGROUND_COLOR_2, -0.2);
  //   const burstDiv = ReactDOM.findDOMNode(this._burstRef);
  //   if (burstDiv) {
  //     // star.tune({ parent: a });
  //     const burstDivCenterPosition = this._getDivCenterPosition(burstDiv.getBoundingClientRect());
  //     circle.tune(burstDivCenterPosition);
  //     burst.tune(burstDivCenterPosition);
  //     timeline.replay();
  //   }
  //   }
  // }

  // _getDivCenterPosition = (clientRect: ClientRect) => {
  //   const { top, left, right, bottom } = clientRect;
  //   console.log('top', top);
  //   console.log('left', left);
  //   console.log('right', right);
  //   console.log('bottom', bottom);
  //   return {
  //     top: top + (bottom - top) / 2,
  //     left: left + (right - left) / 2,
  //   };
  // };

  // componentDidMount() {
  //   const a = ReactDOM.findDOMNode(this._containerRef);
  //   star.tune({ parent: a });
  //   timeline.replay();
  // }

  get hinting(): boolean {
    if (this.props.marked) {
      return ['SHOWING_HINTS', 'HIDING_HINTS'].includes(this.props.status) || this.props.touched;
    } else {
      return false;
    }
  }

  get showing(): boolean {
    if (this.props.marked) {
      return ['SHOWING_INITIAL_TILES', 'SHOWING_HINTS', 'SHOWING_TILES'].includes(
        this.props.status
      );
    } else {
      return true;
    }
  }

  get color(): string {
    return this.hinting ? '#EA4258' : '#3498db';
  }

  render() {
    const { status, disabled, marked, onClick, touched, ...otherProps } = this.props;
    const classNames = [];
    classNames.push(this.showing ? 'Tile-show' : 'Tile-hide');
    classNames.push(this.hinting ? 'Tile-hint' : 'Tile-not-hint');
    classNames.push(touched ? 'Tile-touched' : 'Tile-untouched');
    classNames.push(marked ? 'Tile-marked' : 'Tile-unmarked');
    classNames.push(disabled ? 'Tile-disabled' : 'Tile-enabled');
    const tileBackgroundColor = this.color;
    const tileShadowBackgroundColor = utils.getDifferentLuminance(this.color, 0.2);
    return (
      <div
        className={`Tile ${classNames.join(' ')}`}
        onClick={onClick}
        ref={ref => (this._burstRef = ref)}
        {...otherProps}
      >
        <div className={`Tile-shadow`} style={{ backgroundColor: tileBackgroundColor }} />
        <div className={`Tile-content`} style={{ backgroundColor: tileShadowBackgroundColor }}>
          <div className={`Tile-star`}>{'★'}</div>
        </div>
      </div>
    );
  }
}
