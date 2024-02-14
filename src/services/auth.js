import {
  signUp,
  signIn,
  confirmSignUp,
  autoSignIn,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";

export async function Login(username, password, setLogged) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username,
      password,
      attributes: {
        email: username,
      },
    });
    console.log("check if true: ", isSignedIn, ", Next Step: ", nextStep);
    setLogged(true);
  } catch (error) {
    console.log("error signing in", error);
  }
}

export async function Register(
  username,
  password,
  setConfirmSignUpCode
) {
  try {
    await signUp({
      username: username,
      password: password,
      attributes: {
        email: username,
      },
    });
    console.log("Sign up successful! Confirmation code sent to your email.");
    // You may want to redirect the user to a confirmation page or handle the confirmation flow
    setConfirmSignUpCode(false);
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

export async function handleSignUpConfirmation(
  username,
  confirmationCode,
  setLogged
) {
  console.log("this is email", username, "and this is code", confirmationCode);
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    console.log("check if true: ", isSignUpComplete, ", Next Step: ", nextStep);
    setLogged(true);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

//check if signid in
export async function checkPersistedLogin(logged) {
  try {
    const signInOutput = await autoSignIn();
    if (signInOutput && signInOutput.signInUserSession) {
      // User is already signed in, update your UI accordingly
      logged(true);
    }
  } catch (error) {
    console.log("Error checking persisted login:", error);
  }
}

// reset password
export async function handleResetPassword(username) {
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

export async function handleConfirmResetPassword(
  username,
  confirmationCode,
  newPassword
) {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
  } catch (error) {
    console.log(error);
  }
}