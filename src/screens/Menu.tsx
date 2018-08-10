import * as React from "react";
// import { observable } from "mobx";
import { inject, observer } from "mobx-react";
// import delay from "../utils/delay";
import { Stores } from "../types/Stores";
import "./Menu.css";

interface Props {
  score: number;
  primaryColor: string;
  navigateToPlayground: () => void;
}

const mapStoresToProps = (stores: Stores) => ({
  score: stores.game.score,
  primaryColor: stores.game.primaryColor,
  navigateToPlayground: stores.router.navigateToPlayground
});

class Menu extends React.Component<Props> {
  public render() {
    const { primaryColor } = this.props;
    return (
      <div className={"Menu"} style={{ backgroundColor: primaryColor }}>
        <p className="Menu-title">Left-Right</p>
      </div>
    );
  }
}

export default inject(mapStoresToProps)(observer(Menu));
