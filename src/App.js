import React, { useEffect, useState } from "react";
import "./styles.css";
import Login from "./components/authentication/Login.jsx";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { checkPersistedLogin } from "./services/auth";
import { getCurrentUser } from "aws-amplify/auth";

function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
      <Link to="/mypage">MyPage</Link>
    </nav>
  );
}

function App() {
  const [loged, setLoged] = useState(false);
  const [register, setRegister] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => checkPersistedLogin(setLoged), []);

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setLoged(true);
    } catch (err) {
      console.log("get current user error ", err);
    }
  }

  currentAuthenticatedUser();

  return (
    <Router>
      <div className={!loged && "App"}>
        {loged && (
          <div className="header-section">
            <Header logged={loged} setLogged={setLoged} />
          </div>
        )}
        {loged && (
          <div>
            <Home />
          </div>
        )}

        {!loged && (
          <div>
            {!resetPassword ? (
              <>
            {!register ? (
              <SignIn setLogged={setLoged} Link={Link} register={setRegister} ResetPassword={setResetPassword} />
            ) : (
              <SignUp Link={Link} register={setRegister} setLogged={setLoged} />
            )}
            {/* <Login logged={setLoged} /> */}</>)
            : (
                <ForgetPassword goBack={setResetPassword} />
            )
            }
            <Menu />

            {
              //eroriaq sakaifo
              /* <Routes>
              <Route path="/signin" Component={<SignIn />} />
              <Route path="/signup" Component={<SignUp />} />
            </Routes> */
            }
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
