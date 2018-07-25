/* @flow */
import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import delay from "../utils/delay";
import "./Score.css";

import type { Stores } from "../types/Stores";

type Props = {
  score: number,
  primaryColor: string,
  navigateToPlayground: () => mixed
};

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    score: 0,
    primaryColor: "blue",
    navigateToPlayground: () => null
  };

  @observable exiting: boolean = false;

  handleRetryClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  render() {
    const { primaryColor } = this.props;
    return (
      <div
        className={`Score ${this.exiting ? "Score-exiting" : ""}`}
        style={{ backgroundColor: primaryColor }}
      >
        <p className="Score-label">Score: </p>
        <p className="Score-points" style={{ color: primaryColor }}>
          {this.props.score}
        </p>
        <div
          className="Score-retry"
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={this.handleRetryClick}
        >
          Restart
        </div>
        <div className="Score-menu" onClick={this.handleRetryClick}>
          Menu
        </div>
      </div>
    );
  }
}
