import React, { Component } from "react";
import "./player.css";

export default class Player extends Component {
  render() {
    return (
      <div className="player-card">
          <h1 onClick={this.props.clickEvent}>{this.props.name}</h1>
        <div className="content">
          <div className="score">{this.props.globalScore}</div>
          <h2>Current:{this.props.score}</h2>
        </div>
      </div>
    );
  }
}
