import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button";
import { useLogin } from "../../../../core/hooks/login.hook";
import UserProfileBtn from "./UserProfileBtn";
import CartButton from "./CartButton";
import { useSelector } from "react-redux";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state) => state.User);

  const [logoutTrigger, setLogoutTrigger] = useState(0);
  const [isLoggedIn, token] = useLogin(logoutTrigger);
  const [activePage, setActivePage] = useState("Home");

  const prevIsLoggedIn = useRef(isLoggedIn);

  //Check is user is already logged in or not and handle accordingly
  useEffect(() => {
    if (prevIsLoggedIn.current && !isLoggedIn) {
      navigate("/login");
      if (location.pathname !== "/") {
        setActivePage("Home");
      }
    }
    prevIsLoggedIn.current = isLoggedIn;
  }, [isLoggedIn, location.pathname, navigate]);

  // Function to map pathnames to page names
  const getPageName = (pathname) => {
     if (
      pathname.startsWith("/shop") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/product")
    ) {
      return "Shop";
    } 
    else {
      return "Home";
    }
  };

  // Update activePage based on the current path
  useEffect(() => {
    setActivePage(getPageName(location.pathname));
  }, [location.pathname]);

  const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(true);
  const [isCartMenuHidden, setIsCartMenuHidden] = useState(true);

  //Function to swtich nav links
  const handleClick = (name) => {
    setActivePage(name);
    switch (name) {
      
      case "Home":
        navigate("/");
        break;
      case "Shop":
        navigate("/shop");
        break; 
      default:
        break;
    }
  };

  const logIn = () => {
    navigate("/login");
  };

  const signUp = () => {
    navigate("/sign-up");
  };

  const handleOnClickProfile = () => {
    setIsProfileMenuHidden((prev) => !prev);
  };

  const handleOnClickCart = () => {
    setIsCartMenuHidden((prev) => !prev);
  };

  return (
    <nav className="hero-nav">
      <div className="nav-logo">
        <Link to="/" onClick={() => setActivePage("Home")}>
          <img
            src="./images/logo/logo-icon-transparent.png"
            alt="Home of Pets"
          />
        </Link>
      </div>
      <ul className="nav-links">
        {["Home", "Shop"].map(
          (name) => (
            <li key={name}>
              <button
                className={`nav-link ${activePage === name ? "active" : ""}`}
                onClick={() => handleClick(name)}
              >
                {name}
              </button>
            </li>
          )
        )}
      </ul>
      {!isLoggedIn ? (
        <div className="nav-auth">
          <Button
            text="LOG-IN"
            handleOnClick={logIn}
            classes={["log-in"]}
            type="button"
          />
          <Button
            text="SIGN-UP"
            handleOnClick={signUp}
            classes={["sign-up"]}
            type="button"
          />
        </div>
      ) : (
        <ul className="user-nav-buttons">
          <li>
            <div className="cart-pic" onClick={handleOnClickCart}>
              <img src={"./images/categories/icons/cart.png"} alt="" />
            </div>
            <CartButton
              isCartMenuHidden={isCartMenuHidden}
              setIsCartMenuHidden={setIsCartMenuHidden}
            />
          </li>
          <li>
            <div className="pfp-pic" onClick={handleOnClickProfile}>
              <img
                src={`http://127.0.0.1:8000/images/users/${userData.image}`}
                alt=""
              />
            </div>
            <UserProfileBtn
              isProfileMenuHidden={isProfileMenuHidden}
              setIsProfileMenuHidden={setIsProfileMenuHidden}
              setLogoutTrigger={setLogoutTrigger}
            />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
