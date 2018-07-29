/* @flow */
import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import Logo from "../components/Logo";
import delay from "../utils/delay";
import "./Splash.css";

import type { Stores } from "../types/Stores";

type Props = {
  primaryColor: string,
  navigateToPlayground: () => mixed
};

const mapStoresToProps = (stores: Stores) => ({
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground
});

@inject(mapStoresToProps)
@observer
export default class Splash extends Component<Props> {
  static defaultProps = {
    primaryColor: "#A6E1DB",
    navigateToPlayground: () => null
  };

  @observable exiting: boolean = false;

  handleStartClick = async () => {
    this.exiting = true;
    await delay(500);
    this.props.navigateToPlayground();
  };

  render() {
    const { primaryColor } = this.props;
    return (
      <div className="Splash">
        <Logo />
        <div
          className="Splash-start"
          style={{ color: primaryColor, borderColor: primaryColor }}
          onClick={this.handleStartClick}
        >
          New game
        </div>
      </div>
    );
  }
}
