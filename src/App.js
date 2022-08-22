import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/pages/LandingPage";
import Authintication from "./auth/pages/Authintication";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authintication />} />
      </Routes>
    </div>
  );
}

export default App;
