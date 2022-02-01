import api from "../api";

const Login = {
  login: (values) => {
    return new Promise((resolve, reject) => {
      api.post("http://localhost:3000/users/login", values)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          resolve();
        });
    });
  },
};

export default Login;
