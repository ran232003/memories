import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "./Modal";

const NavigationBar = (props) => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => {
    return state.auth.user;
  });
  let homePageLink = user === null ? "/" : "/home";
  const handleModal = () => {
    console.log("show");
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={homePageLink}>
          Memories
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user === null ? (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/auth/signup">
                SignUp
              </Nav.Link>
              <Nav.Link as={Link} to="/auth/login">
                Login
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link onClick={handleModal}>Logout</Nav.Link>
              <Nav.Link as={Link} to="/auth/login">
                Add Post
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      <MyModal show={show} handleCloseModal={handleCloseModal} />
    </Navbar>
  );
};

export default NavigationBar;
