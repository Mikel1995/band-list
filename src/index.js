import React from "react";
import ReactDOM from "react-dom";
import App from "./views/routes";
import { Router } from "react-router-dom";
import history from "./history";
import { Provider } from "mobx-react";
import Store from "./state/Index";


const store = Store.create({
  users: []
})

ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  ,
  document.getElementById("root")
);


if (process.env.NODE_ENV !== 'production') {
  require('mobx-logger').enableLogging();
}