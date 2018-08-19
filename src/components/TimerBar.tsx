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
    const { time } = this.props;
    const progress = (100 / constants.TIME_LIMIT_IN_SECONDS) * time;
    const redValue = (255 / 100) * (100 - progress);
    const opacity = 0.2 + (0.4 / 100) * (100 - progress);
    const backgroundColor = `rgba(${redValue},0,0,${opacity})`;
    const boxShadow = `0px 0px 1vmin 0px ${backgroundColor}`;
    return (
      <div className="TimerBar">
        <div
          className="TimerBar-progress"
          style={{
            width: `${progress}%`,
            backgroundColor,
            boxShadow
          }}
        />
      </div>
    );
  }
}
