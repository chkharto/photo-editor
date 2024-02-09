import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./authStyles.css";
import {
  signUp,
  signIn,
  confirmSignUp,
  autoSignIn,
  getCurrentUser,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";

// import { fetchAuthSession } from "aws-amplify/auth";
// console.log(fetchAuthSession());
//



function Login({ logged }) {
  const [state, setState] = useState(false);
  const [Visibility, setVisibility] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState();
  const [confirmCode, setConfirmCode] = useState(true);
  const [resetPasswordd, setResetPasswordd] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);

  useEffect(() => {
    const checkPersistedLogin = async () => {
      try {
        const signInOutput = await autoSignIn();
        if (signInOutput && signInOutput.signInUserSession) {
          // User is already signed in, update your UI accordingly
          logged(true);
        }
      } catch (error) {
        console.log("Error checking persisted login:", error);
      }
    };

    checkPersistedLogin();
  }, []);

  //reset password----------------------------------------------------------------------------
  async function handleResetPassword(username) {
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log("EmptyResetPasswordUsername: ", error);
    }
  }

  function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    console.log(nextStep);
    // eslint-disable-next-line default-case
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  }

  //confirmResetPassword----------------------------------------------------------------------

  async function handleConfirmResetPassword(
    username,
    confirmationCode,
    newPassword,
  ) {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
      console.log("passwor is changed");
    } catch (error) {
      console.log("username is required to confirm reset password:", error);
      
    }
  }

  
  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      logged(true);
    } catch (err) {
      console.log(err);
    }
  }

  currentAuthenticatedUser();

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setState((prev) => !prev);
  };

  async function handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      if (signInOutput && signInOutput.signInUserSession) {
        // User is already signed in, update your UI accordingly
        logged(true);
      }
    } catch (error) {
      console.log(error);
      console.log(email);
    }
  }

  async function handleSignUpConfirmation({ username, confirmationCode }) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      console.log(isSignUpComplete, nextStep);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  const onConfirm = async (event) => {
    console.log("this is confirmation code: ", confirmationCode);
    console.log("this is email :", email);
    event.preventDefault();

    try {
      if (email && confirmationCode) {
        await confirmSignUp({
          username: email,
          confirmationCode: confirmationCode,
        });
        console.log("Confirmation successful!");
        handleAutoSignIn();
        handleSignUpConfirmation(email, confirmationCode);
        logged(true);
        // ...
      } else {
        console.error("Email or confirmation code is missing.");
        console.log(email);
      }

      // Now the user is confirmed and can sign in
      // You can redirect the user to the main application or handle the confirmation flow
    } catch (error) {
      console.error("Error confirming sign up:", error);
    }
  };

  async function signInToAws(username, password) {
    console.log(username, password);
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log("check if true: ", isSignedIn, ", Next Step: ", nextStep);
      logged(true);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (state) {
      // If in sign up mode
      onConfirm(event);
      try {
        await signUp({
          username: email,
          password: password,
          attributes: {
            email: email,
          },
        });
        console.log(
          "Sign up successful! Confirmation code sent to your email."
        );
        setConfirmCode(false);
        // You may want to redirect the user to a confirmation page or handle the confirmation flow
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      // If in sign in mode
      try {
        if (email && password) {
          const user = await signInToAws(email, password);
          console.log("Sign in successful!", user);

          localStorage.setItem(
            "authToken",
            user.signInUserSession.idToken.jwtToken
          );
          console.log(email);
        } else {
          console.error("Email or password is missing.");
        }
        // You may want to redirect the user to the main application after successful sign-in
      } catch (error) {
        console.error("Error signing in:", error);
        console.log(email);
      }
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form className="login-form" onSubmit={onSubmit}>
          {resetPasswordd && <h1>{state ? "Sign up" : "Sign in"}</h1>}
          {!resetPasswordd && <h1>Reset Password</h1>}

          {resetPasswordd && (
            <div className="inputs">
              {confirmCode && (
                <>
                  {!state && (
                    <div className="input-box">
                      <PersonIcon className="icon" />
                      <input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  )}
                  {state && (
                    <>
                      <div className="input-box">
                        <EmailIcon className="icon" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="input-box">
                    <LockIcon className="icon" />
                    <input
                      type={Visibility ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {!Visibility ? (
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

                  <div className="checkbox">
                    <label>
                      <input type="checkbox" /> Remember me
                    </label>
                    {!state && (
                      <a
                        href="forgot-password"
                        onClick={(event) => {
                          event.preventDefault();
                          handleResetPassword(email);
                          setResetPasswordd(false);
                        }}
                      >
                        Forgot Password?
                      </a>
                    )}
                  </div>
                </>
              )}
              {!confirmCode && (
                <>
                  {/* Existing code */}
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
                </>
              )}
            </div>
          )}
          {resetPasswordd && (
            <>
              {!confirmCode && (
                <button className="btn" onClick={onConfirm} type="submit">
                  confirm
                </button>
              )}
              {confirmCode && (
                <button className="btn" type="submit">
                  {state ? "Sign up" : "Sign in"}
                </button>
              )}
              {confirmCode && (
                <div className="register-link">
                  <p>
                    {state ? "Have an account? " : "Don't have an account? "}
                    <a href="d" onClick={handleRegisterClick}>
                      {state ? "Sign in" : "Sign up"}
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
          {!resetPasswordd && (
            <>
              <div className="input-box">
                <PersonIcon className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
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
              <div className="input-box">
                <LockIcon className="icon" />
                <input
                  type={Visibility ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {!Visibility ? (
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
              <button
                className="btn"
                onClick={(event) => {
                  event.preventDefault();
                  handleConfirmResetPassword(email, confirmationCode, password);
                  console.log(email);
                }}
              >
                Confirm
              </button>
              <a
                href="d"
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  marginTop: "20px",
                  fontSize: "18px",
                }}
              >
                Go Back
              </a>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
