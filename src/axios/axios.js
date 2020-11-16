import axios from "axios";

const instance = axios.create({
  baseURL: "https://arcane-plateau-30623.herokuapp.com/api",
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.authorization = `Bearer ${token}`;
  }
  return request;
});

export default instance;
