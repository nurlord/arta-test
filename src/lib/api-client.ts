import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);
    return Promise.reject(error);
  },
);
