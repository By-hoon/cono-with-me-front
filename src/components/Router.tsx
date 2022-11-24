import { isMobile } from "react-device-detect";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLive from "../routes/CreateLive";
import CreateWith from "../routes/CreateWith";
import EditLive from "../routes/EditLive";
import PlayLive from "../routes/PlayLive";
import { Header, MobileHeader } from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      {isMobile ? <MobileHeader /> : <Header />}
      <Routes>
        <Route path="/create/with" element={<CreateWith />} />
        <Route path="/create/live" element={<CreateLive />} />
        <Route path="/edit/live" element={<EditLive />} />
        <Route path="/live/play" element={<PlayLive />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
