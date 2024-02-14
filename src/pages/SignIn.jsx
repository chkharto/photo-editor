import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Login } from "../services/auth";
import { Link } from "react-router-dom";

const SignIn = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleVisibilityToggle = () => {
    setVisibility((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Login(email, password, setLogged);
      // Handle successful sign-in or other actions if needed
    } catch (error) {
      // Handle sign-in error
      console.log("error signing in", error);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="inputs">
            <div className="input-box">
              <PersonIcon className="icon" />
              <input
                type="text"
                placeholder="Username"
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

              <Link to="forgetpassword" >
                Forgot Password?
              </Link>
            </div>
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <bc />
              <a href="d"><Link to="/signup">Sign up</Link></a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
