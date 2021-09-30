import { types, flow, toGenerator } from "mobx-state-tree";
import { LOGGED_IN, LOGGED_OUT, PENDING_LOGIN } from "../constants";
import Login from "../api/Login";
import history from "../history";

const User = types
  .model("User", {
    username: types.string,
    photo: types.string,
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
    login: flow(function*(creds) {
      self.state = PENDING_LOGIN;
      try {
        const response = yield* toGenerator(Login.login(creds));
        const { data, status } = response;
        switch (status) {
          case 200:
            const loggedUser = data.filter(
              user =>
                (user.email === creds.username ||
                  user.username === creds.username) &&
                user.password === creds.password
            );
            if (loggedUser.length >= 1) {
              self.username = loggedUser[0].username;
              self.photo = loggedUser[0].photo;
              self.state = LOGGED_IN;
            }
            break;
          default:
            self.state = LOGGED_OUT;
            break;
        }
      } catch (error) {
        console.log(error);
        self.state = LOGGED_OUT;
        self.loginFailed = true;
      }
    }),
    logOut: () => {
      self.state = LOGGED_OUT;
      // self.username = "";
      // self.photo = "";
      // history.go('/login')
    }
  }));
export default User;
