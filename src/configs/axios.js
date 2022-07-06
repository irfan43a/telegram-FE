import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
});

axiosApiInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosApiInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  },
  function (error) {
    if (error.response.status === 400 && error.response.data.message === "token invalid");
    alert("jangan rubah token");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
