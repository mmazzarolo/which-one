import * as React from "react";
import { observer } from "mobx-react";
import getCardData from "../utils/getCardData";
import getDifferentLuminance from "../utils/getDifferentLuminance";
import "./Card.css";

interface Props {
  imageId: number;
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
    const { src, backgroundColor } = cardData;
    const shadowColor = getDifferentLuminance(backgroundColor, -0.2);
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
          backgroundColor,
          boxShadow: `0 0.6vmin 0 ${shadowColor}`
        }}
        {...otherProps}
      >
        <img src={src} alt="" />
      </div>
    );
  }
}
