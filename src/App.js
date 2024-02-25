import React, { useEffect, useState } from "react";
import "./styles.css";
import "./components/authentication/authStyles.css";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { checkPersistedLogin } from "./services/auth";
import { getCurrentUser } from "aws-amplify/auth";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Error from "./pages/Error.jsx";

function App() {
  const [loged, setLoged] = useState(false);
  // const [register, setRegister] = useState(false);
  // const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    checkPersistedLogin(setLoged);
    currentAuthenticatedUser();
  }, []);

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

  return (
    <Router>
      <div className={!loged && "App"}>
        {loged ? (
          <>
            <div className="header-section">
              <Header logged={loged} setLogged={setLoged} />
            </div>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error />} />  
              </Routes>
            </div>
          </>
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<SignIn setLogged={setLoged} />} />
              <Route path="signup" element={<SignUp setLogged={setLoged} />} />
              <Route path="forgetpassword" element={<ForgetPassword />} />
              <Route path="*" element={<Error />} />  
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

