import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateLive from "../routes/CreateLive";
import CreateWith from "../routes/CreateWith";
import EditLive from "../routes/EditLive";
import LiveList from "../routes/LiveList";
import PlayLive from "../routes/PlayLive";
import SignIn from "../routes/SignIn";
import SignUp from "../routes/SignUp";
import WithList from "../routes/WithList";
import { Header } from "./Header";

const Router = () => {
  const cookies = new Cookies();
  const refreshToken = cookies.get("refreshToken");
  const expireAt = localStorage.getItem("expiresAt");
  const accessToken = localStorage.getItem("accessToken");

  const [isSignIn, setIsSignIn] = useState(accessToken && refreshToken && expireAt);

  useEffect(() => {
    if (moment(expireAt).diff(moment()) < 0) {
      axios
        .post("/gossing/auth/refresh", {
          accessToken,
          refreshToken,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("expiresAt", moment().add(20, "minute").format("yyyy-MM-DD HH:mm:ss"));
          cookies.set("refreshToken", res.data.refreshToken, {
            path: "/",
            secure: true,
          });
        })
        .catch((error) => {
          setIsSignIn(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("expiresAt");
          cookies.remove("refreshToken");
        });
    }
  }, []);
  return (
    <BrowserRouter>
      {isSignIn ? (
        <>
          <Header />
          <Routes>
            <Route path="/with/create" element={<CreateWith />} />
            <Route path="/with/list" element={<WithList />} />
            <Route path="/live/create" element={<CreateLive />} />
            <Route path="/live/edit" element={<EditLive />} />
            <Route path="/live/list" element={<LiveList />} />
            <Route path="/live/play" element={<PlayLive />} />
            <Route path="/live/*" element={<Navigate replace to="/live/list" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn setIsSignIn={setIsSignIn} />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
export default Router;
