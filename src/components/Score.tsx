import * as React from "react";
import { observer } from "mobx-react";
import "./Score.css";

interface Props {
  color: string;
  score: number;
}

@observer
export default class Score extends React.Component<Props> {
  public render() {
    const { color, score } = this.props;
    return (
      <div className="Score">
        <p className="Score-label">Score: </p>
        <p className="Score-points" style={{ color }}>
          {score}
        </p>
      </div>
    );
  }
}
