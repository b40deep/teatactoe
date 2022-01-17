import { Component } from "react";

export default class Game extends Component {
  state = {
    p1: [],
    p2: [],
    btn_text: ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    dashboard: "tea tac toe",
    current_player: 1,
    winner: 0,
  };

  render() {
    return (
      <div className="game-container">
        <div
          className={
            this.state.winner === 1
              ? "dashboard p1"
              : this.state.winner === 2
              ? "dashboard p2"
              : "dashboard"
          }
        >
          <h1>{this.state.dashboard}</h1>
        </div>
        <div className="game-row">
          {this.state.btn_text.map((btn, index) => (
            <button
              name={index}
              key={index}
              onClick={() => this.handlePressed(index)}
              type="button"
              className={
                this.state.btn_text[index] === "x"
                  ? "btn btn-lg btn-secondary p1"
                  : this.state.btn_text[index] === "o"
                  ? "btn btn-lg btn-secondary p2"
                  : "btn btn-lg btn-secondary "
              }
              disabled={
                this.state.btn_text[index] === "x"
                  ? true
                  : this.state.btn_text[index] === "o"
                  ? true
                  : false
              }
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="reset-game">
          <h3 onClick={this.handleReset} className="cursor">
            start again
          </h3>
        </div>
      </div>
    );
  }

  getClassName = (btn_pos) => {
    return "btn btn-lg btn-secondary ";
  };

  handleReset = () => {
    let p1 = [];
    let p2 = [];
    let btn_text = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
    let dashboard = "tea tac toe...";
    let current_player = 1;
    let winner = 0;
    this.setState({ p1, p2, btn_text, dashboard, current_player, winner });
  };

  handlePressed = (btn_pos) => {
    console.log(btn_pos);
    //check who is playing
    //assign btn to their array
    //assign btn text
    //update who playing next
    let { p1, p2, btn_text, dashboard, current_player } = this.state;
    if (current_player === 1) {
      p1.push(btn_pos);
      btn_text[btn_pos] = "x";
      dashboard = "Player Two, your turn!";
      current_player = 2;
    } else {
      p2.push(btn_pos);
      btn_text[btn_pos] = "o";
      dashboard = "Player One, your turn!";
      current_player = 1;
    }
    this.setState({ p1, p2, btn_text, dashboard, current_player });
    console.log(current_player === 1 ? p2 : p1);
    //next, check if someone has won
    this.handleWin(btn_pos);
    //next, check if stalemate
    this.handleStalemate();
  };

  handleWin(btn_pos) {
    let { p1, p2, dashboard, current_player, winner } = this.state;
    let array_of_pos = current_player === 1 ? p1 : p2;
    console.log("reached check win fn()" + btn_pos);
    let win = false;
    /*
      0 - 12, 48, 36
      1 - 02, 47
      2 - 01, 46, 58
      3 - 06, 45
      4 - 08, 17, 26, 35
      5 - 28, 34
      6 - 03, 24, 78
      7 - 14, 68
      8 - 04, 25, 67
      */
    switch (btn_pos) {
      case 4:
        if (
          (array_of_pos.includes(0) && array_of_pos.includes(8)) ||
          (array_of_pos.includes(1) && array_of_pos.includes(7)) ||
          (array_of_pos.includes(2) && array_of_pos.includes(6)) ||
          (array_of_pos.includes(3) && array_of_pos.includes(5))
        ) {
          win = true;
        }
        break;
      case 0:
        if (
          (array_of_pos.includes(1) && array_of_pos.includes(2)) ||
          (array_of_pos.includes(4) && array_of_pos.includes(8)) ||
          (array_of_pos.includes(3) && array_of_pos.includes(6))
        ) {
          win = true;
        }
        break;
      case 2:
        if (
          (array_of_pos.includes(1) && array_of_pos.includes(0)) ||
          (array_of_pos.includes(4) && array_of_pos.includes(6)) ||
          (array_of_pos.includes(5) && array_of_pos.includes(8))
        ) {
          win = true;
        }
        break;
      case 6:
        if (
          (array_of_pos.includes(0) && array_of_pos.includes(3)) ||
          (array_of_pos.includes(4) && array_of_pos.includes(2)) ||
          (array_of_pos.includes(7) && array_of_pos.includes(8))
        ) {
          win = true;
        }
        break;
      case 8:
        if (
          (array_of_pos.includes(0) && array_of_pos.includes(4)) ||
          (array_of_pos.includes(5) && array_of_pos.includes(2)) ||
          (array_of_pos.includes(7) && array_of_pos.includes(6))
        ) {
          win = true;
        }
        break;
      case 1:
        if (
          (array_of_pos.includes(0) && array_of_pos.includes(2)) ||
          (array_of_pos.includes(4) && array_of_pos.includes(7))
        ) {
          win = true;
        }
        break;
      case 3:
        if (
          (array_of_pos.includes(0) && array_of_pos.includes(6)) ||
          (array_of_pos.includes(4) && array_of_pos.includes(5))
        ) {
          win = true;
        }
        break;
      case 5:
        if (
          (array_of_pos.includes(2) && array_of_pos.includes(8)) ||
          (array_of_pos.includes(3) && array_of_pos.includes(4))
        ) {
          win = true;
        }
        break;
      case 7:
        if (
          (array_of_pos.includes(1) && array_of_pos.includes(4)) ||
          (array_of_pos.includes(6) && array_of_pos.includes(8))
        ) {
          win = true;
        }
        break;

      default:
        break;
    }
    console.log("setting the state");
    if (win) {
      dashboard = "Player " + current_player + " has won!";
      winner = current_player;
      this.setState({ dashboard, winner });
    }
  }

  handleStalemate() {
    if (this.state.btn_text.includes("_") && this.state.winner === 0) {
      console.log("game still going");
    } else {
      console.log("game ended in a stalemate");
      this.setState({ dashboard: "Nobody won." });
    }
  }
}
