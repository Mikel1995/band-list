import React from "react";
import ReactDOM from "react-dom";
import App from "./views/routes";
import { Router } from "react-router-dom";
import history from "./history";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  require("mobx-logger").enableLogging();
}
