import React from "react";
import ReactDOM from "react-dom";
import App from "./views/routes";
import { Router } from "react-router-dom";
import history from "./history";
import { Provider } from "mobx-react";
import Store from "./state/Index";
import "antd/dist/antd.css";


const store = Store.create({
  users: []
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  require("mobx-logger").enableLogging();
}
