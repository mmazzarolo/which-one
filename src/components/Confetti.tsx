import * as React from "react";
import ReactConfetti from "react-confetti";
import "./Confetti.css";

interface Props {}

class Confetti extends React.Component<Props> {
  public render() {
    return (
      <div className="Confetti">
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

export default Confetti;
