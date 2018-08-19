import * as React from "react";
import ReactConfetti from "react-confetti";
import "./Confetti.css";

class Confetti extends React.Component {
  public render() {
    return (
      <div className="Confetti">
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

export default Confetti;
