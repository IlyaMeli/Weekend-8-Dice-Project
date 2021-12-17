import React, { Component } from "react";
import Game from "./components/Game"
import "./App.css"

export default class App extends Component {
  render() {
    return <div className="main">
      <Game />
    </div>;
  }
}
