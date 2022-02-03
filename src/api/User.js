import api from "../api";

const UserApi = {
  register: (values)=>{
    return new Promise((resolve, reject)=>{
      api.post("http://localhost:3000/users", values)
      .then((result)=>{
        resolve(result);
      })
      .catch((error)=>{
        reject(error)
      })
    })
  },
  login: (values) => {
    return new Promise((resolve, reject) => {
      api.post("http://localhost:3000/users/login", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error)
        });
    });
  },
  getProfile: () => {
    return new Promise((resolve, reject) => {
      api.get("http://localhost:3000/users/me")
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error)
        });
    });
  },
  updateProfile: (values)=> {
    return new Promise((resolve, reject)=>{
      api.patch("http://localhost:3000/users/me", values)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error)
      });
    })
  },
  uploadAvatar: (values)=> {
    return new Promise((resolve, reject)=>{
      api.post("http://localhost:3000/users/me/avatar", values)
      .then((result)=>{
        resolve(result)
      })
      .catch((error)=>{
        reject(error);
      })
    })
  }
};

export default UserApi;
