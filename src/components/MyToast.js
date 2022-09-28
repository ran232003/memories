import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./MyToast.css";
const MyToast = (props) => {
  let showObject = props.showObject;
  const [show, setShow] = useState(showObject);
  useEffect(() => {
    setShow(showObject);
  }, [showObject]);
  return (
    <div className="test">
      <ToastContainer
        color="red"
        className="toast-container test"
        toastClassName="dark-toast"
      >
        <Toast
          className="myToast"
          color="red"
          show={show.showAlert}
          onClose={() => {
            setShow(() => {
              props.showObject.showAlert = false;
              return { ...show, showAlert: false };
            });
            if (showObject.cssClass === "success") {
              props.handleNavigate();
            }
          }}
          delay={2100}
          autohide
        >
          <Toast.Body className={showObject.cssClass} variant="Success">
            {showObject.lable} <br />
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default MyToast;
