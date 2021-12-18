import React, { Component } from "react";
import Game from "./components/Game/Game";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="layer">
          <Game />
        </div>
      </div>
    );
  }
}
