import { Button, Form, Alert } from "react-bootstrap";
import React, { useState, useContext, useRef } from "react";
import { MyContext } from "../context";
import "../style/app.css";
const Stage1 = () => {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);
    if (validate) {
      setError([false, ""]);
      context.addPlayer(value);
      textInput.current.value = "";
    }
  };

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "please enter a player name"]);
      return false;
    }
    if (value.length < 3) {
      setError([true, "Player name should be at least 3 caracters"]);
      return false;
    }
    return true;
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textInput}
          ></Form.Control>

          {error[0] ? <Alert>{error[1]}</Alert> : null}
          <Button className="addPlayer" variant="primary" type="submit">
            Add player
          </Button>
        </Form.Group>
        {context.state.players && context.state.players ? (
          <>
            <div>
              <ul className="list-group">
                <hr />
                {context.state.players.map((player, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  >
                    {player}
                    <span
                      className="btn badge-danger color-danger"
                      onClick={() => context.removePlayer(idx)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <div className="action_button" onClick={() => context.next()}>
                NEXT
              </div>
            </div>
          </>
        ) : (
          "here"
        )}
      </Form>
    </>
  );
};

export default Stage1;
