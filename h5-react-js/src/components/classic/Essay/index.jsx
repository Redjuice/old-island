import React, { Component } from "react";

import tag from "./images/essay@tag.png";

import style from "../index.module.css";

export default class index extends Component {
  render() {
    const { img, content } = this.props;
    return (
      <div className={style.container}>
        <img className={style.classicImg} src={img} />
        <img className={style.tag} src={tag} />
        <span className={style.content}>{content}</span>
      </div>
    );
  }
}
