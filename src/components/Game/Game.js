import React, { Component } from "react";
import GameSetting from "./GameSetting";
import "./game.css";
import Player from "../Player/Player";

const initialState = {
  pointsToWin: 100,
  dice: [null, null],
  playersTurn: "player1",
  winner: false,
  player1: {
    currentScore: 0,
    globalScore: 0,
  },
  player2: {
    currentScore: 0,
    globalScore: 0,
  },
};

export default class Game extends Component {
  state = JSON.parse(JSON.stringify(initialState));

  reset = () => {
    this.setState(JSON.parse(JSON.stringify(initialState)));
  };

  handlePoints = (event) => {
    this.setState({ pointsToWin: event.target.value });
  };
  randomizeDice = () => {
    let newDiceValue = [];
    while (newDiceValue.length < 2) {
      let dieValue = Math.floor(Math.random() * 6) + 1;
      newDiceValue.push(dieValue);
    }
    return newDiceValue;
  };
  sumDice = () => {
    let res = 0;
    const { dice } = this.state;
    res = dice[0] + dice[1];
    return res;
  };
  updateCurrentScore = (currPlayer) => {
    this.setState((prevState) => ({
      [currPlayer]: {
        ...prevState[currPlayer],
        currentScore: this.state[currPlayer].currentScore + this.sumDice(),
      },
    }));
  };
  updateGlobalScore = (currPlayer) => {
    this.setState(
      (prevState) => ({
        [currPlayer]: {
          ...prevState[currPlayer],
          globalScore:
            this.state[currPlayer].globalScore +
            this.state[currPlayer].currentScore,
        },
      }),
      () => {
        if (this.state[currPlayer].globalScore >= this.state.pointsToWin) {
          this.setState({ [currPlayer]: { globalScore: "WINNER" } });
          this.setState({ winner: true });
        }
      }
    );
  };
  diceRoll = () => {
    const { playersTurn, winner } = this.state;
    if (winner) return;
    let newDiceValue = this.randomizeDice();
    this.setState({ dice: newDiceValue }, () => {
      let sum = this.sumDice();
      if (sum === 12) {
        this.switchPlayer();
      }
      this.updateCurrentScore(playersTurn);
    });
  };

  switchPlayer = () => {
    this.state.playersTurn === "player1"
      ? this.setState({ playersTurn: "player2" })
      : this.setState({ playersTurn: "player1" });
  };

  hold = () => {
    const { playersTurn, winner } = this.state;
    if (winner) return;
    this.updateGlobalScore(playersTurn);
    this.setState({ dice: [null, null] });
    this.switchPlayer();
    this.setState((prevState) => ({
      [playersTurn]: {
        ...prevState[playersTurn],
        currentScore: 0,
      },
    }));
  };
  render() {
    return (
      <div className="game-wrapper">
        <Player
          playersTurn={this.state.playersTurn}
          globalScore={this.state.player1.globalScore}
          score={this.state.player1.currentScore}
          name="player1"
        />
        <GameSetting
          diceRoll={this.diceRoll}
          hold={this.hold}
          dice={this.state.dice}
          reset={this.reset}
          handlePoints={this.handlePoints}
          points={this.state.pointsToWin}
        />
        <Player
          playersTurn={this.state.playersTurn}
          globalScore={this.state.player2.globalScore}
          score={this.state.player2.currentScore}
          name="player2"
        />
      </div>
    );
  }
}
