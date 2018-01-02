/* @flow */
// https://codepen.io/agrimsrud/pen/Dhbfy/
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Timer.css';

type Props = {
  time: number,
};

const draw = (elements: HTMLElement[], rate: number) => {
  let count = elements.length;
  let angle = 360 * rate;
  angle %= 360;
  const rad = angle * Math.PI / 180;
  const x = Math.sin(rad) * 125;
  const y = Math.cos(rad) * -125;
  const mid = angle > 180 ? 1 : 0;
  const shape = `M 0 0 v -125 A 125 125 1 ${mid} 1 ${x} ${y} z`;

  if (elements instanceof Array) {
    while (count--) {
      elements[count].setAttribute('d', shape);
    }
  } else {
    elements.setAttribute('d', shape);
  }
};

const svgPieTimer = (elements: HTMLElement[], duration: number = 1000, loops: number = 0) => {
  const n = loops === 0 ? 0 : loops ? loops : 1;
  const end = Date.now() + duration * n;
  const totaldur = duration * n;

  (function frame() {
    var current = Date.now();
    let remaining = end - current;
    let rate = n + 1 - remaining / duration;

    if (remaining < 60) {
      draw(elements, n - 0.0001);
      if (remaining < totaldur && n) return;
    }
    draw(elements, rate);

    requestAnimationFrame(frame);
  })();
};

@observer
export default class Timer extends Component<Props> {
  pathBorderRef: any = null;
  pathLoaderRef: any = null;

  componentDidMount() {
    if (this.pathBorderRef && this.pathLoaderRef) {
      svgPieTimer([this.pathLoaderRef, this.pathBorderRef], 1000, 0);
    }
  }
  render() {
    return (
      <div className={'Timer'}>
        <svg className={'Timer-svg'} viewbox="0 0 250 250">
          <path
            ref={ref => (this.pathBorderRef = ref)}
            className={'Timer-path-border'}
            transform="translate(125,125)"
          />
          <path
            ref={ref => (this.pathLoaderRef = ref)}
            className={'Timer-path-loader'}
            transform="translate(125,125) scale(.84)"
          />
        </svg>
        <p>{this.props.time}</p>
      </div>
    );
  }
}
