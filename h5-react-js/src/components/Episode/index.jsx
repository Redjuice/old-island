import React, { Component } from "react";
import PropTypes from "prop-types";

import style from "./index.module.css";

class Episode extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  state = {
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    year: 0,
    month: "",
    _index: "",
  };

  componentDidMount() {
    const { index } = this.props;
    let val = index < 10 ? "0" + index : index;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    this.setState({
      _index: val,
      year,
      month: this.state.months[month],
    });
  }

  render() {
    const { _index, month, year } = this.state;
    return (
      <div className={style.container}>
        <div className={style.indexContainer}>
          <span className={style.plain}>No.</span>
          <span className={style.index}>{_index}</span>
          <div className={style.line}></div>
        </div>
        <div className={style.dateContainer}>
          <span className={style.month}>{month}</span>
          <span className={style.year}>{year}</span>
        </div>
      </div>
    );
  }
}

export default Episode;
