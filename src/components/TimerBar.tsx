import * as React from "react";
import { observer } from "mobx-react";
import constants from "../config/constants";

import "./TimerBar.css";

interface Props {
  time: number;
}

@observer
export default class TimerBar extends React.Component<Props> {
  public render() {
    const progress = (100 / constants.TIME_LIMIT_IN_SECONDS) * this.props.time;
    return (
      <div className="TimerBar">
        <div className="TimerBar-progress" style={{ width: `${progress}%` }} />
      </div>
    );
  }
}
