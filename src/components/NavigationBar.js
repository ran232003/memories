import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../storage/storageFunctions";
import MyModal from "./Modal";
import "./NavigationBar.css";

const NavigationBar = (props) => {
  const [show, setShow] = useState(false);

  const user = useSelector((state) => {
    return state.auth.user;
  });
  let homePageLink = user === null ? "/" : "/home";
  const handleModal = () => {
    setShow(true);
  };
  const handleCloseModal = (action) => {
    setShow(false);
  };
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand as={Link} to={homePageLink}>
        Memories
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {user === null ? (
          <Nav className="me-auto">
            <Nav.Link className="navLink" as={Link} to="/auth/signup">
              SignUp
            </Nav.Link>
            <Nav.Link className="navLink" as={Link} to="/auth/login">
              Login
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Nav.Link className="navLink" onClick={handleModal}>
              Logout
            </Nav.Link>
            <Nav.Link className="navLink" as={Link} to="/add-post">
              Add Post
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>

      <MyModal show={show} handleCloseModal={handleCloseModal} />
    </Navbar>
  );
};

export default NavigationBar;
