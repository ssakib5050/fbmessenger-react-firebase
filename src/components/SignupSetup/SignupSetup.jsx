import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./SignupSetup.css";

import { Link, useHistory } from "react-router-dom";
import { auth, storage } from "../../firebase";

function SignupSetup() {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [signupSetupError, setSignupSetupError] = useState("");
  const [signupSetuping, setSignupSetuping] = useState(false);

  const history = useHistory();

  const signupSetupHandle = (e) => {
    e.preventDefault();

    setSignupSetupError("");
    setSignupSetuping(true);
    if (fullName && profilePicture) {
      const file = profilePicture;
      const uploadTask = storage
        .ref()

        .child(`images/${uuidv4()}.${profilePicture.name}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setSignupSetupError("Sorry Something Went Wrong");
          setSignupSetuping(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            console.log(fullName);
            const user = auth.currentUser;

            user
              .updateProfile({
                displayName: fullName,
                photoURL: downloadUrl,
              })
              .then(function () {
                // Update successful.

                window.location.replace("/");
              })
              .catch(function (error) {
                // An error happened.
                setSignupSetupError("Sorry Something went wrong");
                setSignupSetuping(false);
              });
          });
        }
      );
    } else {
      setSignupSetupError("Enter Fullname & Upload Photo");
      setSignupSetuping(false);
    }
  };

  return (
    <div className="container login__main_wrap ">
      <div className=" login__main">
        <form
          action=""
          className="login__main_form"
          onSubmit={signupSetupHandle}
        >
          <img
            src="https://lh3.googleusercontent.com/rkBi-WHAI-dzkAIYjGBSMUToUoi6SWKoy9Fu7QybFb6KVOJweb51NNzokTtjod__MzA=s180"
            alt=""
            className="login__main_form_img"
          />
          <input
            type="text"
            placeholder="Full Name"
            className="login__main_form_email"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <input
            type="file"
            placeholder="Password"
            className="login__main_form_password signup__setup_input"
            id="signup__setup_input"
            autoComplete="false"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <label
            htmlFor="signup__setup_input"
            className="login__main_form_password login__main_form_password_label"
          >
            {profilePicture ? profilePicture.name : "Choose File"}
          </label>
          {signupSetupError ? (
            <div className="text-danger mt-3">{signupSetupError}</div>
          ) : (
            ""
          )}
          <div>
            <button
              className={`login__main_form_login ${
                signupSetuping ? "active" : ""
              }`}
              type="submit"
            >
              Continue
            </button>

            <Link to="/" className="login__main_form_signup ">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupSetup;
