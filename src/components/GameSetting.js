import React, { Component } from "react";

export default class GameSetting extends Component {
  render() {
    return (
      <div className="game-container">
        <h1>DICE GAME</h1>
        <div className="dice1">{this.props.dice[0]}</div>
        <div className="dice2">{this.props.dice[1]}</div>
        <h1 onClick={this.props.diceRoll}>Dice Roll</h1>
        <h1 onClick={this.props.hold}>Hold</h1>
          <div onClick={this.props.reset}>Reset</div>
      </div>
    );
  }
}
