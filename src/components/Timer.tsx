import * as React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import "./Timer.css";

interface Props {
  time: number;
}

@observer
export default class Timer extends React.Component<Props> {
  public render() {
    return (
      <div className="Timer">
        <div className="Timer-clock">
          <FontAwesomeIcon icon={faClock} className="Timer-clock-icon-shadow" />
          <FontAwesomeIcon icon={faClock} className="Timer-clock-icon" />
        </div>
        <p>{this.props.time}</p>
      </div>
    );
  }
}
