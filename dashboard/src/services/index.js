import axios from "axios";
import router from "../router";
import AuthService from "./auth";
import UsersService from "./users";
import FeedbacksService from "./feedbacks";
import { setGlobalLoading } from "../store/global";

const API_ENVS = {
  production: "https://backend-treinamento-vuejs-brasil.vercel.app",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }

    if (error.response.status === 401) {
      window.localStorage.removeItem("token");
      router.push({ name: "Home" });
    }
    setGlobalLoading(false);
    return error;
    // eslint-disable-next-line
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient),
};
