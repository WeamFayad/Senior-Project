import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";
import { loggedIn } from "../../../core/dataSource/localDataSource/user";
import { local } from "../../../core/helpers/localstorage";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";

const GOOGLE_CLIENT_ID =
  "80417416444-mc1emnb4r8o1eph2f3note9p7vubvlen.apps.googleusercontent.com";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    gapi.load("auth2", () => {
      gapi.auth2.init({ client_id: GOOGLE_CLIENT_ID });
    });

    // Check if user is already logged in
    const token = local("token");
    if (token) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
    if (message) {
      setTimeout(() => setMessage(""), 2000);
    }
  }, [error, message]);

  const handleGoogleLogin = async () => {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const id_token = googleUser.getAuthResponse().id_token;

      const response = await authDataSource.googleAuth({ token: id_token });
      if (response.status === "success") {
        local("token", response.token);
        local("type", response.user.userType);

        dispatch(
          loggedIn({
            email: response.user.email,
            user_id: response.user._id,
            name: response.user.name,
            address: response.user.address,
            phone: response.user.phone,
            userType: response.user.userType,
            chatSessions: response.user.chatSessions,
            cart: response.user.cart,
            image: response.user.image,
            token: response.token,
          })
        );

        navigateTo("/");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { email, password };
    try {
      const response = await authDataSource.login(data);
      local("token", response.token);
      local("type", response.user.userType);

      dispatch(
        loggedIn({
          email: response.user.email,
          user_id: response.user._id,
          name: response.user.name,
          address: response.user.address,
          phone: response.user.phone,
          userType: response.user.userType,
          chatSessions: response.user.chatSessions,
          cart: response.user.cart,
          image: response.user.image,
          token: response.token,
        })
      );

      navigateTo("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const forgotPassword = () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    setMessage("Password reset link is sent");
  };

  return (
    <section className="login-section">
  
      <div className="signin">
        <div className="content">
          <img src="./favicon.png" alt="logo" />
          <h2 className="log-cart-title">Log In</h2>

          <div className="sign-up-part">
            <p>New Member?</p>
            <Link to="/sign-up">
              <h4>Signup</h4>
            </Link>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>

            <div className="inputBox google-sign-in">
              <p>-------- or sign in with --------</p>
              <div className="google-button" onClick={handleGoogleLogin}>
                <img
                  src="./images/productIcons/google-icon.png"
                  alt="google_logo"
                />
                <p>Google</p>
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
