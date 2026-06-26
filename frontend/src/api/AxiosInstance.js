import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const data = error.response?.data;

    if (
      data?.code === "token_not_valid" ||
      data?.code === "user_inactive" ||
      data?.code === "user_not_found"
    ) {
      localStorage.clear();

      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;