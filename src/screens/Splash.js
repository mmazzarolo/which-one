/* @flow */
import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Logo from '../components/Logo';
import utils from '../utils';
import './Splash.css';

import type { Stores } from '../types';

type Props = {
  primaryColor: string,
  navigateToPlayground: () => mixed,
};

const mapStoresToProps = (stores: Stores) => ({
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground,
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    primaryColor: 'blue',
    navigateToPlayground: () => null,
  };

  @observable exiting: boolean = false;

  _handleStartClick = async () => {
    this.exiting = true;
    await utils.delay(500);
    this.props.navigateToPlayground();
  };

  render() {
    const { primaryColor } = this.props;
    return (
      <div className={'Splash'}>
        <Logo />
        <div
          className={'Splash-start'}
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={this._handleStartClick}
        >
          New game
        </div>
      </div>
    );
  }
}