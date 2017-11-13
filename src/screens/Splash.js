/* @flow */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Splash.css';

import type { Stores } from '../types';

type Props = {
  navigateToPlayground: () => mixed,
};

const mapStoresToProps = (stores: Stores) => ({
  navigateToPlayground: stores.router.navigateToPlayground,
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    navigateToPlayground: () => null,
  };

  componentDidMount() {
    setTimeout(this.props.navigateToPlayground, 3000);
  }

  render() {
    return (
      <div className={'Splash'}>
        <h1>Zen Tap</h1>
      </div>
    );
  }
}
