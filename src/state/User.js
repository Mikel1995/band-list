import { types, flow, toGenerator } from "mobx-state-tree";
import { LOGGED_IN, LOGGED_OUT, PENDING_LOGIN } from "../constants";
import UserApi from "../api/User";
import showNotification from "../views/common/Notification";
import { message } from "antd";

const User = types
  .model("User", {
    username: types.string,
    name: types.string,
    age: types.number,
    photo: types.string,
    state: types.enumeration("State", [LOGGED_IN, LOGGED_OUT, PENDING_LOGIN]),
    loginFailed: types.boolean,
    registerError: types.frozen({}),
    tasks: types.frozen([]),
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
            self.name = user.name;
            self.age = user.age;
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
            self.name = user.name;
            self.age = user.age;
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
            self.photo = user.avatar
              ? `data:image/png;base64, ${user.avatar}`
              : "https://picsum.photos/200/300";
            self.name = user.name;
            self.age = user.age;
            break;
          default:
            break;
        }
      } catch (error) {}
    }),
    updateProfile: flow(function* (values) {
      delete values.image;
      delete values.password;
      try {
        const response = yield* toGenerator(UserApi.updateProfile(values));
        const { data: user, status } = response;
        console.log(status);
        switch (status) {
          case 200:
            self.name = user.name;
            self.age = user.age;
            showNotification("success", "INFORMATION", "Update is completed");
            break;
          default:
            break;
        }
      } catch (error) {
        showNotification("error", "INFORMATION", "Error during this action");
      }
    }),
    uploadImage: flow(function* (values) {
      try {
        const response = yield* toGenerator(UserApi.uploadAvatar(values));
        const { data, status } = response;
        switch (status) {
          case 200:
            showNotification("success", "INFORMATION", "Photo is changed");
            break;

          default:
            break;
        }
      } catch (error) {
        console.log("");
      }
    }),
    getUserTasks: flow(function* () {
      try {
        const { status, data = [] } = yield* toGenerator(
          UserApi.getTasksList()
        );
        switch (status) {
          case 200:
            self.tasks = data.map((task) => ({
              _id: task._id,
              key: task._id,
              completed: task.completed,
              description: task.description,
              owner: self.name,
            }));
            break;
          default:
            showNotification("error", "INFORMATION", "Unable to get tasks");
            break;
        }
      } catch (error) {
        showNotification("error", "INFORMATION", "Unable to get tasks");
      }
    }),
    updateTask: flow(function* (taskId, values) {
      try {
        const { status, data } = yield* toGenerator(
          UserApi.updateTask(taskId, values)
        );
        switch (status) {
          case 200:
            message.success("Task successfully updated");
            self.tasks = self.tasks.map((task) =>
              task._id === data._id
                ? { ...task, completed: data.completed }
                : task
            );
            break;
          default:
            showNotification(
              "error",
              "INFORMATION",
              "Unable to update the task"
            );
            break;
        }
      } catch (error) {
        showNotification("error", "INFORMATION", "Unable to update the task");
      }
    }),
    addNewTask: flow(function* (values) {
      try {
        const { data, status } = yield* toGenerator(UserApi.addTask(values));

        switch (status) {
          case 201:
            self.tasks = [
              ...self.tasks,
              {
                _id: data._id,
                key: data._id,
                completed: data.completed,
                description: data.description,
                owner: self.name,
              },
            ];

            message.info("Task is added!");
            break;

          default:
            showNotification(
              "error",
              "INFORMATION",
              "Unable to update the task"
            );
            break;
        }
      } catch (error) {
        showNotification("error", "INFORMATION", "Unable to update the task");
      }
    }),
    logOut: () => {
      self.state = LOGGED_OUT;
      self.username = "";
      self.photo = "";
      localStorage.removeItem("TOKEN");
    },
  }));
export default User;
