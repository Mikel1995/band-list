import { types, flow, toGenerator } from "mobx-state-tree";
import { LOGGED_IN, LOGGED_OUT, PENDING_LOGIN } from "../constants";
import UserApi from "../api/User";

const User = types
  .model("User", {
    username: types.string,
    photo: types.string,
    state: types.enumeration("State", [LOGGED_IN, LOGGED_OUT, PENDING_LOGIN]),
    loginFailed: types.boolean,
    registerError: types.frozen({}),
  })
  .views((self) => ({
    get isLoggedIn() {
      return self.state === LOGGED_IN;
    },
    get isLoggedOut() {
      return self.state === LOGGED_OUT;
    },
    get isPendingLogin() {
      return self.state === PENDING_LOGIN;
    },
  }))
  .actions((self) => ({
    login: flow(function* (creds) {
      self.state = PENDING_LOGIN;
      self.loginFailed = false;
      try {
        const response = yield* toGenerator(UserApi.login(creds));
        const { data, status } = response;
        switch (status) {
          case 200:
            const { user, token } = data;
            self.username = user.email;
            self.state = LOGGED_IN;
            localStorage.setItem("TOKEN", token);
            break;
          default:
            self.state = LOGGED_OUT;
            self.loginFailed = true;
            break;
        }
      } catch (error) {
        self.loginFailed = true;
        self.state = LOGGED_OUT;
      }
    }),
    register: flow(function* (values) {
      self.registerError = {};
      try {
        const response = yield* toGenerator(UserApi.register(values));
        const { data, status } = response;
        switch (status) {
          case 201:
            const { user, token } = data;
            localStorage.setItem("TOKEN", token);
            self.username = user.email;
            self.state = LOGGED_IN;
            break;
          default:
            break;
        }
      } catch (error) {
        self.registerError = error;
      }
    }),
    getProfile: flow(function* () {
      try {
        const response = yield* toGenerator(UserApi.getProfile());
        const { data: user, status } = response;
        switch (status) {
          case 200:
            self.username = user.email;
            self.photo = user.avatar ? `data:image/png;base64, ${user.avatar}` : 'https://picsum.photos/200/300';
            break;
          default:
            break;
        }
      } catch (error) {}
    }),
    logOut: () => {
      self.state = LOGGED_OUT;
      self.username = "";
      self.photo = "";
      localStorage.removeItem("TOKEN");
    },
  }));
export default User;
