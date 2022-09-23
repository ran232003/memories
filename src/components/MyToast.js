import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const MyToast = (props) => {
  let showObject = props.showObject;
  const [show, setShow] = useState(showObject);
  useEffect(() => {
    setShow(showObject);
  }, [showObject]);
  console.log(showObject, "toast");
  return (
    <div className="App">
      <ToastContainer className="toast-container" toastClassName="dark-toast">
        <Toast
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
          delay={1100}
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
