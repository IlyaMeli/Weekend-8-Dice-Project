import React, { Component } from "react";
import "./player.css";

export default class Player extends Component {
  render() {
    let styling;
    if (this.props.name === this.props.playersTurn) {
      styling = {
        backgroundColor: "#f1faee",
      };
    }
    return (
      <div className="player-card" style={styling}>
        <h1 className="player-title" onClick={this.props.clickEvent}>
          {this.props.name}
        </h1>
        <div className="content">
          <div className="score">{this.props.globalScore}</div>
          <h2 className="current">
            Current:<span>{this.props.score}</span>
          </h2>
        </div>
      </div>
    );
  }
}
