import React, { useState, useEffect } from "react";
import "./Signup.css";

import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const history = useHistory();

  const signupHandle = (e) => {
    e.preventDefault();

    setSignupError("");

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setSignupError(error.message);
      })
      .then(() => {
        // console.log(email == true);
        if (email && password) {
          console.log("Not empty");
          if (!signupError) {
            history.push("/signup/setup");
          }
        } else {
          console.log("empty");
        }
      });
  };

  return (
    <div className="container login__main_wrap dev">
      <div className="dev login__main">
        <form action="" className="login__main_form" onSubmit={signupHandle}>
          <img
            src="https://lh3.googleusercontent.com/rkBi-WHAI-dzkAIYjGBSMUToUoi6SWKoy9Fu7QybFb6KVOJweb51NNzokTtjod__MzA=s180"
            alt=""
            className="login__main_form_img"
          />
          <input
            type="text"
            placeholder="Email Address"
            className="login__main_form_email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="login__main_form_password"
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {signupError ? (
            <div className="text-danger mt-3">{signupError}</div>
          ) : (
            ""
          )}
          <div>
            <button className="login__main_form_login" type="submit">
              Sign Up
            </button>

            <Link to="/" className=" login__main_form_signup">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
