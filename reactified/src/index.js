import React from "react";
import ReactDom from "react-dom";
import Game from "./components/Game";

const App = () => {
  return <Game />;
};

ReactDom.render(<App />, document.getElementById("root"));
