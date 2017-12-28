/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.png';
import utils from '../utils';
import './Card.css';

import type { GameStatus } from '../types';

type Props = {
  imageId: number,
  position: number,
  swipedDirection?: 'left' | 'right',
  onClick: () => mixed,
};

@observer
export default class Card extends Component<Props> {
  render() {
    const { imageId, position, swipedDirection, onClick, ...otherProps } = this.props;
    const imageSource = utils.getImageSourceById(imageId);
    const classNames = [];
    if (position >= 0) {
      classNames.push(`Card-at-position-${position}`);
    }
    if (swipedDirection === 'left') classNames.push('Card-swiped-left');
    if (swipedDirection === 'right') classNames.push('Card-swiped-right');
    return (
      <div className={`Card ${classNames.join(' ')}`} onClick={onClick}>
        <img src={imageSource} />
      </div>
    );
  }
}
