import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateLive from "../routes/CreateLive";
import CreateWith from "../routes/CreateWith";
import EditLive from "../routes/EditLive";
import LiveList from "../routes/LiveList";
import PlayLive from "../routes/PlayLive";
import SignUp from "../routes/SignUp";
import WithList from "../routes/WithList";
import { Header } from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/with/create" element={<CreateWith />} />
        <Route path="/with/list" element={<WithList />} />
        <Route path="/live/create" element={<CreateLive />} />
        <Route path="/live/edit" element={<EditLive />} />
        <Route path="/live/list" element={<LiveList />} />
        <Route path="/live/play" element={<PlayLive />} />
        <Route path="/live/*" element={<Navigate replace to="/live/list" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
