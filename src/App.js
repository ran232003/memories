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
import PrivateRoutes from "./components/PrivateRoutes";
import AddPost from "./addPosts/pages/AddPost";

function App() {
  const dispatch = useDispatch();
  const user = getUser();
  console.log(user);
  dispatch(authAction.setUser(user));
  useEffect(() => {
    console.log("use e");
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
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-post" exact element={<AddPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
