import * as React from "react";
import { observer } from "mobx-react";
import getCardData from "../utils/getCardData";
import getDifferentLuminance from "../utils/getDifferentLuminance";
import "./Card.css";

interface Props {
  imageId: string;
  position: number;
  swipedDirection?: "left" | "right";
  valid: boolean | null;
  animateEnter?: boolean;
  mini?: boolean;
}

@observer
export default class Card extends React.Component<Props> {
  public render() {
    const {
      imageId,
      position,
      swipedDirection,
      valid,
      animateEnter,
      mini,
      ...otherProps
    } = this.props;
    const cardData = getCardData(imageId);
    const { imgSrc, color } = cardData;
    const shadowColor = getDifferentLuminance(color, -0.2);
    const classNames = [];
    classNames.push(`Card-at-position-${position}`);
    if (swipedDirection && valid === false) {
      classNames.push("Card-invalid");
    } else {
      classNames.push("Card-valid");
      if (swipedDirection === "left") {
        classNames.push("Card-swiped-left");
      }
      if (swipedDirection === "right") {
        classNames.push("Card-swiped-right");
      }
    }
    if (animateEnter) {
      classNames.push("Card-entering");
    } else {
      classNames.push("Card-entered");
    }
    if (mini) {
      classNames.push("Card-mini");
    }
    return (
      <div
        className={`Card ${classNames.join(" ")}`}
        style={{
          backgroundColor: color,
          boxShadow: `0 0.6vmin 0 ${shadowColor}`
        }}
        {...otherProps}
      >
        <img src={imgSrc} alt="" />
      </div>
    );
  }
}
