import React, { Component } from "react";
import PropTypes from 'prop-types';
import disLeftSrc from "./images/triangle.dis@left.png";
import disRightSrc from "./images/triangle.dis@right.png";
import leftSrc from "./images/triangle@left.png";
import rightSrc from "./images/triangle@right.png";

import style from "./index.module.css";

export default class Nav extends Component {
  static propTypes = {
    title: PropTypes.string,
    first: PropTypes.bool,
    latest: PropTypes.bool,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
  }

  render() {
    const { title, first, latest, onPrevious, onNext } = this.props;
    return (
      <div className={style.container}>
        <img
          onClick={onNext}
          className={style.icon}
          src={latest ? disLeftSrc : leftSrc}
        />
        <span className={style.title}>{title}</span>
        <img
          onClick={onPrevious}
          className={style.icon}
          src={first ? disRightSrc : rightSrc}
        />
      </div>
    );
  }
}
