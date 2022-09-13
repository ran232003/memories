import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/pages/LandingPage";
import Authintication from "./auth/pages/Authintication";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { getUser } from "./storage/storageFunctions";
import { useDispatch } from "react-redux";
import { authAction } from "./store/authSlice";
import HomePage from "./homePage/HomePage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = getUser();
    console.log(user);
    dispatch(authAction.setUser(user));
    function start() {
      gapi.client.init({
        clientId:
          "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:status" element={<Authintication />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
