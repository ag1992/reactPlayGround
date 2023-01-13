import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: "1",
    players: [],
    result: "",
  };

  addPlayerHandler = (name) => {
    this.setState((prevState) => ({
      players: [...prevState.players, name],
    }));
  };

  removePlayerHandler = (id) => {
    let newArray = this.state.players;

    newArray.splice(id, 1);
    this.setState({ players: newArray });
  };

  nextHandler = () => {
    const { players } = this.state;
    if (players.length < 2) {
      toast.error("you neet at lease 2 players", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    } else {
      this.setState(
        {
          stage: 2,
        },
        () => {
          setTimeout(() => {
            this.generateLooser();
          }, 2000);
        }
      );
    }
  };

  generateLooser = () => {
    const { players } = this.state;

    this.setState({
      result: players[Math.floor(Math.random() * players.length)],
    });
  };

  handleReset = () => {
    this.setState({
      stage: 1,
      players: [],
      result: "",
    });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerHandler,
            next: this.nextHandler,
            newLooser: this.generateLooser,
            reset: this.handleReset,
          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer></ToastContainer>
      </>
    );
  }
}

export { MyContext, MyProvider };
