import React, { useContext } from "react";
import { MyContext } from "../context";

const Stage2 = () => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="result_wrapper">
        <h3>The looser is:</h3>
        <div>{context.state.result}</div>
      </div>
      <div className="action_button" onClick={() => context.reset()}>
        Start over
      </div>
      <div className="action_button btn_2" onClick={() => context.newLooser()}>
        New looser
      </div>
    </>
  );
};

export default Stage2;
