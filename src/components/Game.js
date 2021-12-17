import React, { Component } from "react";
import GameSetting from "./GameSetting";
import "./game.css";
import Player from "./Player";

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
    // this.setState({[x]:{currentScore: this.state.x.currentScore + this.sumDice()}})
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
          this.setState({ [currPlayer]: { globalScore: "WINNER!" } });
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
      this.sumDice();
      this.updateCurrentScore(playersTurn);
    });
  };

  hold = () => {
    const { playersTurn, pointsToWin, winner } = this.state;
    if (winner) return;
    this.updateGlobalScore(playersTurn);
    this.setState({ dice: [null, null] });
    this.state.playersTurn === "player1"
      ? this.setState({ playersTurn: "player2" })
      : this.setState({ playersTurn: "player1" });
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
          globalScore={this.state.player1.globalScore}
          score={this.state.player1.currentScore}
          name="Player1"
        />
        <GameSetting
          diceRoll={this.diceRoll}
          hold={this.hold}
          dice={this.state.dice}
          reset={this.reset}
        />
        <Player
          globalScore={this.state.player2.globalScore}
          score={this.state.player2.currentScore}
          name="Player2"
        />
      </div>
    );
  }
}
