import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.authorization = `Bearer ${token}`;
  }
  return request;
});

export default instance;
