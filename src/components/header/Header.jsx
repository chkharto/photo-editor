import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { signOut } from "aws-amplify/auth";
import { Link } from "react-router-dom";

import "./header.css";

const Menu = () => (
  <>
    <p>
      <Link className="a" to="/">
        Home
      </Link>
    </p>
    <p>
      <Link className="a" to="/about">
        About
      </Link>
    </p>
    <p>
      <Link className="a" to="/contact">
        Contact
      </Link>
    </p>
  </>
);

function Header({ logged, setLogged }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  async function handleSignOut() {
    try {
      await signOut();
      setLogged((prev) => !prev);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }


  return (
    <div className="header">
      <div className="header-links">
        <div className="header-links_logo">
          <h1>Photomania</h1>
        </div>
        <div className="header-links_container">
          <Menu />
        </div>
      </div>
      {!logged ? (
        <div className="header-sign">
          <p>Sign in</p>
          <button type="button">Sign up</button>
        </div>
      ) : (
        <div className="header-sign">
          
          <button
            type="button"
            onClick={() => {
              handleSignOut(); 
            }}
          >
            Log Out
          </button>
        </div>
      )}
      <div className="header-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="header-menu_container scale-up-center">
            <div className="header-menu_container-links">
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
