/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import utils from '../utils';
import './Logo.css';

import type { GameStatus } from '../types';

type Props = {};

@observer
export default class Logo extends Component<Props> {
  render() {
    return (
      <div className={'Logo-container'}>
        <h1 className={'Logo-text'}>{'memomemo'}</h1>
      </div>
    );
  }
}
