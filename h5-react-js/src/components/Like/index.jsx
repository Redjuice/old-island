import React, { Component } from "react";
import PropTypes from "prop-types";

import yesSrc from "./images/like.png";
import noSrc from "./images/like@dis.png";

import style from "./index.module.css";

class Like extends Component {
  static propTypes = {
    like: PropTypes.bool,
    count: PropTypes.number,
    readOnly: PropTypes.bool,
    onLike: PropTypes.func.isRequired,
  };

  static defaultProps = {
    like: false,
    count: 0,
    readOnly: false,
  };

  state = {};

  componentDidMount() {}

  render() {
    const { like, count, onLike } = this.props;
    const behavior = !like ? "like" : "cancel";
    return (
      <div className={style.container} onClick={() => onLike(behavior)}>
        <img src={like ? yesSrc : noSrc} />
        <span>{count}</span>
      </div>
    );
  }
}

export default Like;
