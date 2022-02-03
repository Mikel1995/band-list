import axios from "axios";
import history from "../history";
import showNotification from "../views/common/Notification";

axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axios.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("TOKEN")) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      };
    }

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { data, status } = error.response;

    if (status === 401) {
      showNotification("error", data.error, "");
      history.go("/login");
    }
    if (error.response.data) {
      const { errors } = error.response.data;
      return Promise.reject(errors);
    }
    return Promise.reject(error);
  }
);

export default axios;
