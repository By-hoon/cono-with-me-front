import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLive from "../routes/CreateLive";
import CreateWith from "../routes/CreateWith";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create/with" element={<CreateWith />} />
        <Route path="/create/live" element={<CreateLive />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
