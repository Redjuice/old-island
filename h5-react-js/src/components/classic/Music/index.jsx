import React, { Component } from "react";

import tagSrc from "./images/music@tag.png";
import pauseSrc from "./images/player@pause.png";
import playSrc from "./images/player@play.png";

import style from "./index.module.css";

export default class Music extends Component {
  audioRef = React.createRef()

  state = {
    playing: false,
  };

  onPlay = () => {
    let { playing } = this.state;
    this.setState({
      playing: !playing,
    });
    playing ? this.audioRef.current.pause() : this.audioRef.current.play()
  };


  renderMusic = () => {
    const { img, content, url } = this.props;
    const { playing } = this.state;
    return (
      <div className={style.container}>
        <img className={`${playing && style.rotation} ${style.classicImg}`} src={img} />
        <img
          className={style.playerImg}
          onClick={this.onPlay}
          src={!playing ? playSrc : pauseSrc}
        />
        <img className={style.tag} src={tagSrc} />
        <span className={style.content}>{content}</span>
        <audio ref={this.audioRef} src={url}></audio>
      </div>
    );
  };

  render() {
    return this.renderMusic();
  }
}
