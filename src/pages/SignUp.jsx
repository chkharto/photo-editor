import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Register, handleSignUpConfirmation } from "../services/auth";
import { Link } from "react-router-dom";

const SignUp = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [confirmSignUpCode, setConfirmSignUpCode] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState();

  const handleVisibilityToggle = () => {
    setVisibility((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Register(email, password, setConfirmSignUpCode);
      // Handle successful sign-up or other actions if needed
    } catch (error) {
      // Handle sign-up error
      console.log("error signing up", error);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          {confirmSignUpCode ? (
            <>
              <h1>Sign up</h1>{" "}
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

                <div className="input-box">
                  <LockIcon className="icon" />
                  <input
                    type={visibility ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {!visibility ? (
                    <VisibilityOffIcon
                      className="eye-icon"
                      onClick={handleVisibilityToggle}
                    />
                  ) : (
                    <VisibilityIcon
                      className="eye-icon"
                      onClick={handleVisibilityToggle}
                    />
                  )}
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                </div>
              </div>
              <button className="btn" type="submit">
                Sign Up
              </button>
              <div className="register-link">
                <p>
                  have an account? <bc />
                  <Link to="/" >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Confirm Code</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Confirmation Code"
                  value={confirmationCode} 
                  onChange={(event) => {
                    setConfirmationCode(event.target.value);
                  }}
                />
              </div>
              <button className="btn" onClick={() => handleSignUpConfirmation(email, confirmationCode, setLogged)}>Confirm</button>
              <p className="goback" onClick={() => setConfirmSignUpCode(true)}>Go Back</p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
