/* @flow */
import React, { Component } from 'react';
import Splash from './Splash';
import { inject, observer } from 'mobx-react';
import Playground from './Playground';
import Score from './Score';
import './Router.css';

import type { Stores } from '../types';

type Props = {
  currentScreen: string,
};

const mapStoresToProps = (stores: Stores) => ({
  currentScreen: stores.router.currentScreen,
});

@inject(mapStoresToProps)
@observer
export default class Root extends Component<Props> {
  static defaultProps = {
    currentScreen: 'SPLASH',
  };

  render() {
    let content;
    switch (this.props.currentScreen) {
      case 'SPLASH':
        content = <Splash />;
        break;
      case 'PLAYGROUND':
        content = <Playground />;
        break;
      case 'SCORE':
        content = <Score />;
        break;
      default:
        content = <div />;
        break;
    }
    return <div className={'Router'}>{content}</div>;
  }
}
