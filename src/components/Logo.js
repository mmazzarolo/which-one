/* @flow */
import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Logo.css";

type Props = {};

@observer
export default class Logo extends Component<Props> {
  render() {
    return (
      <div className="Logo-container">
        <h1 className="Logo-text">CHOW</h1>
      </div>
    );
  }
}
