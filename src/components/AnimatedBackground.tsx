import * as React from "react";

import "./AnimatedBackground.css";

interface Props {
  backgroundColor1: string;
  backgroundColor2?: string;
  isExiting?: boolean;
  children: React.ReactNode;
}

export default class AnimatedBackground extends React.Component<Props> {
  public static defaultProps = {
    backgroundGradientLuminance: 0.2,
    isExiting: false
  };

  get background() {
    const { backgroundColor1, backgroundColor2 } = this.props;
    if (backgroundColor2 && backgroundColor1 !== backgroundColor2) {
      return `linear-gradient(to bottom right, ${backgroundColor1}, ${backgroundColor2}`;
    } else {
      return backgroundColor1;
    }
  }

  public render() {
    const { children, isExiting } = this.props;
    return (
      <div
        className={`AnimatedBackground ${
          isExiting ? "AnimatedBackground-exiting" : ""
        }`}
        style={{ background: this.background }}
      >
        {children}
      </div>
    );
  }
}
