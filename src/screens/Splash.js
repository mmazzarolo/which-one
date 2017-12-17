/* global lottie */
/* @flow */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import lottie from 'lottie-web';
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
    // setTimeout(this.props.navigateToPlayground, 3000);
    lottie.loadAnimation({
      container: document.getElementById('bm'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'data.json', // the path to the animation json
    });
  }

  render() {
    return (
      <div className={'Splash'}>
        <h1>Zen Tap</h1>
        <div id="bm" />
      </div>
    );
  }
}
