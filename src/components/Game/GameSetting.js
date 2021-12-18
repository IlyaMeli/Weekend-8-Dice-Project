import React, { Component, Fragment } from "react";

export default class GameSetting extends Component {
  render() {
    return (
      <div className="game-container">
        <h1 className="game-title">DICE GAME</h1>
        <div className="dice-container">
          {this.props.dice[0] && (
            <>
              <img
                className="dice"
                src={`./images/dice-${this.props.dice[0]}.png`}
              />
              <img
                className="dice"
                src={`./images/dice-${this.props.dice[1]}.png`}
              />
            </>
          )}
        </div>
        <div className="roll" onClick={this.props.diceRoll}>
          Dice Roll
        </div>
        <div className="hold" onClick={this.props.hold}>
          Hold
        </div>
        <div className="reset" onClick={this.props.reset}>
          Reset
        </div>
      </div>
    );
  }
}
