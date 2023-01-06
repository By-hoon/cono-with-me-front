import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";
import { Cookies } from "react-cookie";

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const cookies = new Cookies();
  const refreshToken = cookies.get("refreshToken");
  const expireAt = localStorage.getItem("expiresAt");
  let accessToken = localStorage.getItem("accessToken");
  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const { data } = await axios.post("/gossing/auth/refresh", {
      accessToken,
      refreshToken,
    });
    accessToken = data.accessToken;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("expiresAt", moment().add(20, "minute").format("yyyy-MM-DD HH:mm:ss"));
    cookies.set("refreshToken", data.refreshToken, {
      path: "/",
      secure: true,
    });
  }
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return config;
};

const refreshErrorHandle = (err: any) => {
  const cookies = new Cookies();
  cookies.remove("refreshToken");
};

export { refresh, refreshErrorHandle };
