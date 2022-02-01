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
      api.get("http://localhost:3000/users/me", {headers: {'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`}})
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error)
        });
    });
  },
};

export default UserApi;
