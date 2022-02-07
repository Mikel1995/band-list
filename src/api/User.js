import { values } from "mobx";
import api from "../api";

const UserApi = {
  register: (values) => {
    return new Promise((resolve, reject) => {
      api
        .post("http://localhost:3000/users", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  login: (values) => {
    return new Promise((resolve, reject) => {
      api
        .post("http://localhost:3000/users/login", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getProfile: () => {
    return new Promise((resolve, reject) => {
      api
        .get("http://localhost:3000/users/me")
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateProfile: (values) => {
    return new Promise((resolve, reject) => {
      api
        .patch("http://localhost:3000/users/me", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  uploadAvatar: (values) => {
    return new Promise((resolve, reject) => {
      api
        .post("http://localhost:3000/users/me/avatar", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getUserList: () => {
    return new Promise((resolve, reject) => {
      api
        .get("http://localhost:3000/users")
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTasksList: () => {
    return new Promise((resolve, reject) => {
      api
        .get("http://localhost:3000/tasks")
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateTask: (taskId, values) => {
    return new Promise((resolve, reject) => {
      api
        .patch(`http://localhost:3000/task/${taskId}`, values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addTask: (values) => {
    return new Promise((resolve, reject)=>{
      api.post('http://localhost:3000/tasks', values)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
    })
  },
  deleteTask: (taskId) => {
    return new Promise((resolve, reject)=>{
      api.delete(`http://localhost:3000/task/${taskId}`)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
    })
  }
};

export default UserApi;
