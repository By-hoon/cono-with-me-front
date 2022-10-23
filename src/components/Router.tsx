import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateWith from "../routes/CreateWith";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create/with" element={<CreateWith />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
