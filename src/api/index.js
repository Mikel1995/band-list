import axios from "axios";

axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  
});

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    console.log('response',response);
    return response;
  },
  function(error) {
    if (error.response.data) {
      const {errors} = error.response.data;
      return Promise.reject(errors)
    }
    return Promise.reject(error);
  }
);


export default axios;