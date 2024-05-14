import React, { useEffect, useState } from "react";

import "./style.css";
//router dependencies
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
//remote data storage dependencies
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";

//local data storage dependencies and helpers
import { local } from "../../../core/helpers/localstorage";
import CheckMark from "../../components/common/CheckMark";

function SignUp() {
  const navigateTo = useNavigate();
  //state to store form related data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    //check if user is already logged in
    const token = local("token");
    if (token) {
      navigateTo("/");
    }
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  //handle login form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords does not match");
      return;
    }
    if (password.length < 5) {
      setError("Password too short");
      return;
    }
    if (phone.length < 8) {
      setError("Phone number not valid");
      return;
    }
    if (address.length < 10) {
      setError("Address not detailed enough");
      return;
    }
    //data to be send of body of request
    let data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
    };
    try {
      //axios request
      const response = await authDataSource.register(data);
      setSuccess(true);
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <section className="Sign-in-section">
        {/* Each item of array represents a span box, 128 is needed, 100 extra to take account for bigger screens and resizing */}
   
        <div className="signin">
          {!success ? (
            <div className="content">
              <img src="./favicon.png" alt="logo" />

              <h2>Sign Up</h2>

              <div className="sign-up-part">
                <p>Already have an account?</p>
                <Link to="/login">
                  <h4>login Here</h4>
                </Link>
              </div>
              <form className="form" onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <i>Full Name</i>
                </div>
                <div className="inputBox">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i>Email</i>
                </div>
                <div className="sign-up_password">
                  <div className="inputBox">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i>Password</i>
                  </div>

                  <div className="inputBox">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConformPassword(e.target.value)}
                    />
                    <i>Confirm Password</i>
                  </div>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <i>Address</i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <i>Phone</i>
                </div>
                <div className="terms">
                  <input type="checkbox" className="terms-box" required />
                  <div className="terms-text">
                    <p className="terms-text-starter">I agree to the</p>
                    <Link to="/terms">
                      <p className="terms-text-link">terms and conditions</p>
                    </Link>
                  </div>
                </div>

                {error && <p className="error">{error}</p>}
                <div className="inputBox">
                  <input type="submit" value="Sign Up" />
                </div>
              </form>
            </div>
          ) : (
            <CheckMark />
          )}
        </div>
      </section>
    </div>
  );
}

export default SignUp;
