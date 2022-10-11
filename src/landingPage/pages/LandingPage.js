import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import "./LandingPage.css";
const LandingPage = () => {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const navigate = useNavigate();

  const handleNavStart = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/auth/signup");
    }
  };
  return (
    <div className="hero-container">
      <BackgroundVideo />
      <h1>THE MEMORIES APP</h1>
      <p>What are you waiting for?</p>
      {user ? (
        <div className="hero-btns">
          <Button className="btns" onClick={handleNavStart}>
            GET STARTED
          </Button>
          <Button variant="light" className="btns">
            FAVORITES MEMORIES
          </Button>
        </div>
      ) : (
        <div className="hero-btns">
          <Button className="btns" onClick={handleNavStart}>
            GET STARTED
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
