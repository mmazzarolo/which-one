/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import utils from '../utils';
import './Card.css';

type Props = {
  imageId: number,
  position: number,
  swipedDirection?: 'left' | 'right',
  valid: ?boolean,
  onClick: () => mixed,
};

@observer
export default class Card extends Component<Props> {
  render() {
    const { imageId, position, swipedDirection, valid, onClick, ...otherProps } = this.props;
    const imageSource = utils.getImageSourceById(imageId);
    const classNames = [];
    classNames.push(`Card-at-position-${position}`);
    if (swipedDirection && valid === false) {
      classNames.push('Card-invalid');
    } else {
      if (swipedDirection === 'left') classNames.push('Card-swiped-left');
      if (swipedDirection === 'right') classNames.push('Card-swiped-right');
    }
    return (
      <div className={`Card ${classNames.join(' ')}`} onClick={onClick} {...otherProps}>
        <img src={imageSource} alt={''} />
      </div>
    );
  }
}
