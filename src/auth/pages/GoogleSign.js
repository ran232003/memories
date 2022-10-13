import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin, googleSignup } from "../../api/apiCalls";
import { setUser } from "../../storage/storageFunctions";
import { authAction } from "../../store/authSlice";

const GoogleSign = (props) => {
  const { status } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let test =
    "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com";
  const successGoogle = async (responseGoogle) => {
    // console.log(responseGoogle.wt.Ad);
    let user = {
      email: responseGoogle.profileObj.email,
      googleId: responseGoogle.profileObj.googleId,
      name: responseGoogle.profileObj.name,
      accessToken: responseGoogle.accessToken,
      tokenId: responseGoogle.tokenId,
    };
    let data, alert;
    if (status === "signup") {
      data = await googleSignup(user);
    } else {
      data = await googleLogin(user);
    }
    if (data.status === "ok") {
      setUser(data.user);
      dispatch(authAction.setUser(data.user));
      navigate("/home");
      alert = { lable: data.message, cssClass: "danger", showAlert: true };
    } else {
      alert = { lable: data.message, cssClass: "success", showAlert: true };
    }
    props.signWithGoogle(alert);
  };
  const failGoogle = (responseGoogle) => {};
  const logoutGoogle = (res) => {};
  return (
    <div>
      <GoogleLogin
        clientId={test}
        onSuccess={successGoogle}
        onFailure={failGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleSign;
