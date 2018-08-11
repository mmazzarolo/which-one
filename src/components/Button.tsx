import * as React from "react";

import "./Button.css";

interface Props {
  label: string;
  color: string;
  type?: "raised" | "flat";
  animationDelay?: number;
  animationDuration?: number;
  onClick: () => void | Promise<void>;
}

export default class Button extends React.Component<Props> {
  public static defaultProps = {
    type: "raised",
    animationDelay: 0,
    animationDuration: 200
  };

  public render() {
    const {
      label,
      color,
      type,
      animationDelay,
      animationDuration,
      onClick
    } = this.props;
    let className = `Button`;
    if (type === "flat") className = `${className} Button-flat`;
    if (type === "raised") className = `${className} Button-raised`;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          color: type === "raised" ? color : "white",
          animationDelay: `${animationDelay}ms`,
          animationDuration: `${animationDuration}ms`
        }}
      >
        {label}
      </div>
    );
  }
}
