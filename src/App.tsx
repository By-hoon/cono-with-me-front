import { isMobile } from "react-device-detect";
import { MobileHeader, Header } from "./components/Header";
import Router from "./components/Router";

const App = () => {
  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <Router />
    </>
  );
};

export default App;
