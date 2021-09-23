import { types, flow } from "mobx-state-tree";
import { LOGGED_IN, LOGGED_OUT, PENDING_LOGIN } from "../constants";

const User = types
  .model("User", {
    username: types.string,
    state: types.enumeration("State", [LOGGED_IN, LOGGED_OUT, PENDING_LOGIN]),
    loginFailed: false
  })
  .views(self => ({
    get isLoggedIn() {
      return self.state === LOGGED_IN;
    },
    get isLoggedOut() {
      return self.state === LOGGED_OUT;
    },
    get isPendingLogin() {
      return self.state === PENDING_LOGIN;
    }
  }))
  .actions(self => ({
    login: flow(function* login(creds) {
      self.state = PENDING_LOGIN;
      try {
        self.username = yield client.login(creds).username;
        self.state = LOGGED_IN;
      } catch (error) {
        self.state = LOGGED_OUT;
        self.loginFailed = true;
      }
    })
  }));
export default User;
