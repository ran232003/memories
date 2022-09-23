import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../storage/storageFunctions";
import { authAction } from "../store/authSlice";

const MyModal = (props) => {
  const { show } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = (event) => {
    let action;
    console.log(event);
    if (typeof event === "undefined" || event?.target?.innerHTML === "No") {
      action = "close";
    } else {
      action = "delete";
      removeUser();
      dispatch(authAction.removeUser());
      navigate("/");
    }
    //console.log("test", event.target.innerHTML);
    props.handleCloseModal(action);
  };
  let test =
    "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com";
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

          <GoogleLogout
            clientId={test}
            render={(renderProps) => (
              <Button variant="primary" onClick={handleClose} disabled={false}>
                Yes
              </Button>
            )}
            buttonText="Logout"
            onLogoutSuccess={handleClose}
          ></GoogleLogout>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyModal;
