import axios from "axios";

axios.create({
  baseURL: "https://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export default axios;