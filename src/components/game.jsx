import { Component } from "react";

export default class Game extends Component {
  state = {
    p1: [],
    p2: [],
    btn_text: ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    dashboard: "tea tac toe",
    current_player: 1,
  };

  render() {
    return (
      <div className="game-container">
        <div className="dashboard">
          <h1>{this.state.dashboard}</h1>
        </div>
        {/* <div className="game">
          {this.state.btn_text.map((btn, index) => (
            <button
              name={index}
              key={index}
              onClick={() => this.handlePressed(index)}
              type="button"
              className={
                this.state.btn_text[index] === "x"
                  ? "btn btn-lg btn-secondary btn-p1"
                  : this.state.btn_text[index] === "o"
                  ? "btn btn-lg btn-secondary btn-p2"
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
        </div> */}
        <div className="game-row">
          <button
            onClick={() => this.handlePressed(0)}
            type="button"
            className={
              this.state.btn_text[0] === "x"
                ? "btn btn-lg btn-secondary btn-p1"
                : this.state.btn_text[0] === "o"
                ? "btn btn-lg btn-secondary btn-p2"
                : "btn btn-lg btn-secondary "
            }
            disabled={
              this.state.btn_text[0] === "x"
                ? true
                : this.state.btn_text[0] === "o"
                ? true
                : false
            }
          >
            {this.state.btn_text[0]}
          </button>
          <button
            onClick={() => this.handlePressed(1)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[1]}
          </button>
          <button
            onClick={() => this.handlePressed(2)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[2]}
          </button>
        </div>
        <div className="game-row">
          <button
            onClick={() => this.handlePressed(3)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[3]}
          </button>
          <button
            onClick={() => this.handlePressed(4)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[4]}
          </button>
          <button
            onClick={() => this.handlePressed(5)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[5]}
          </button>
        </div>
        <div className="game-row">
          <button
            onClick={() => this.handlePressed(6)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[6]}
          </button>
          <button
            onClick={() => this.handlePressed(7)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[7]}
          </button>
          <button
            onClick={() => this.handlePressed(8)}
            type="button"
            className="btn btn-lg btn-secondary"
          >
            {this.state.btn_text[8]}
          </button>
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
    this.setState({ p1, p2, btn_text, dashboard, current_player });
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
  };

  handleWin(btn_pos) {
    let { p1, p2, dashboard, current_player } = this.state;
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
      dashboard = "WINNER! Player " + current_player + " has won!";
      this.setState({ dashboard });
    }
  }
}
