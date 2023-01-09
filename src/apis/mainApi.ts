import axios from "axios";
import { refresh, refreshErrorHandle } from "./refresh";

const mainApi = axios.create({
  baseURL: "/gossing",
  timeout: 10000,
});
mainApi.interceptors.request.use(refresh, refreshErrorHandle);

export default mainApi;
