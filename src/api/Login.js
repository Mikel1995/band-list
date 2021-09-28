import api from "../api";

const Login = {
  login: values => {
    return new Promise((resolve, reject) => {
      api.get("http://localhost:3000/users")
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          resolve();
        });
    });
  }
};

export default Login;
