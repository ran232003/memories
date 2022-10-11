import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./MyToast.css";
const MyToast = (props) => {
  let { toast } = props;
  const [show, setShow] = useState(toast);
  useEffect(() => {
    setShow(toast);
    setTimeout(() => {
      setShow({ show: false, bg: "null" });
    }, 3000);
  }, [toast]);
  return (
    <div className="test">
      <Toast bg={show.bg} show={show.show}>
        <Toast.Body className="toastBody">{show.lable}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
