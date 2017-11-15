/* @flow */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Score.css';

import type { Stores } from '../types';

type Props = {
  score: number,
  primaryColor: string,
  navigateToPlayground: () => mixed,
};

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground,
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    score: 0,
    primaryColor: 'blue',
    navigateToPlayground: () => null,
  };

  render() {
    const { primaryColor, navigateToPlayground } = this.props;
    return (
      <div className={'Score'} style={{ backgroundColor: primaryColor }}>
        <p className={'Score-label'}>Score: </p>
        <p className={'Score-points'} style={{ color: primaryColor }}>
          {this.props.score}
        </p>
        <div
          className={'Score-retry'}
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={navigateToPlayground}
        >
          Restart
        </div>
      </div>
    );
  }
}
