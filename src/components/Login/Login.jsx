import React, { useState } from "react";
import "./Login.css";

import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const loginHandle = (e) => {
    e.preventDefault();
    setLoginError("");

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    });
  };
  return (
    <div className="container login__main_wrap ">
      <div className=" login__main">
        <form action="" className="login__main_form" onSubmit={loginHandle}>
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
          {loginError ? (
            <div className="text-danger mt-3">{loginError}</div>
          ) : (
            ""
          )}

          <div>
            <button className="login__main_form_login" type="submit">
              Log In
            </button>
            <Link to="/signup" className="login__main_form_signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
