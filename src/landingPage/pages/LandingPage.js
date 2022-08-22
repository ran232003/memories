import React from "react";
import { Button } from "react-bootstrap";
import BackgroundVideo from "../components/BackgroundVideo";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="hero-container">
      <BackgroundVideo />
      <h1>THE MEMORIES APP</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button className="btns">GET STARTED</Button>

        <Button variant="light" className="btns">
          FAVORITES <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
