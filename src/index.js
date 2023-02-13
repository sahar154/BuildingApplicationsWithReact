import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import "./index.css";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
