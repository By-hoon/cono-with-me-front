import { isBrowser } from "react-device-detect";
import Router from "./components/Router";

const App = () => {
  return (
    <div className={`${isBrowser ? "browser" : "mobile"}`}>
      <Router />
    </div>
  );
};

export default App;
