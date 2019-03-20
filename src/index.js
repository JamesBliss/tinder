import React from "react";
import ReactDOM from "react-dom";

//
import "./styles.css";

//
import Deck from "./deck";

function App() {
  return <Deck />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
