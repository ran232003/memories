import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../storage/storageFunctions";
import { authAction } from "../../store/authSlice";

const GoogleSign = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let test =
    "168119533642-j168btelnpc9q54ouqtff55qrutuarhv.apps.googleusercontent.com";
  const successGoogle = async (responseGoogle) => {
    console.log(responseGoogle);
    console.log(responseGoogle.wt.Ad);
    let user = {
      email: responseGoogle.profileObj.email,
      id: responseGoogle.profileObj.googleId,
      token: responseGoogle.accessToken,
    };
    setUser(user);
    dispatch(authAction.setUser(user));
    navigate("/home");
  };
  const failGoogle = (responseGoogle) => {
    console.log("faill", responseGoogle);
  };
  const logoutGoogle = (res) => {
    console.log(res, "in logout");
  };
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
