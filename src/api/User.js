import api from "../api";

const UserApi = {
  getProfile: () => {
    return new Promise((resolve, reject) => {
      api.get("http://localhost:3000/users/me", {headers: {'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`}})
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          resolve();
        });
    });
  },
};

export default UserApi;
