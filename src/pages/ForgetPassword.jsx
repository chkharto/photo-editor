import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import {
  handleConfirmResetPassword,
  handleResetPassword,
} from "../services/auth";

const ForgetPassword = ({ goBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [resetPasswordCode, setResetPasswordCode] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleResetPassword(email);
      // Handle successful sign-up or other actions if needed
      setState(false);
    } catch (error) {
      // Handle sign-up error
      console.log("error sending code", error);
    }
  };

  const confirmPassword = (event) => {
    handleConfirmResetPassword(email, resetPasswordCode, password, goBack);
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form className="reset-form" onSubmit={handleSubmit}>
          {state ? (
            <>
              <h1 className="reset">Enter Email</h1>
              <div className="inputs">
                <div className="input-box">
                  <EmailIcon className="icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <button className="btn" type="submit">
                Send Code
              </button>
            </>
          ) : (
            <>
              <h1>Confirm Reset Code</h1>
              <div className="input-box">
                <PersonIcon className="icon" />
                <input
                  className="code"
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  className="code"
                  type="text"
                  placeholder="Confirmation Code"
                  value={resetPasswordCode}
                  onChange={(event) => {
                    setResetPasswordCode(event.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <LockIcon className="icon" />
                <input
                  className="code"
                  type={visibility ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {!visibility ? (
                  <VisibilityOffIcon
                    className="eye-icon"
                    onClick={() => setVisibility((prev) => !prev)}
                  />
                ) : (
                  <VisibilityIcon
                    className="eye-icon"
                    onClick={() => setVisibility((prev) => !prev)}
                  />
                )}
              </div>
              <button className="btn" onClick={() => confirmPassword()}>
                Confirm
              </button>
            </>
          )}
          <p className="goback" onClick={() => goBack(false)}>
            Go Back
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
