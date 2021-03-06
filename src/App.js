import React, { useEffect, useState } from "react";
import "./App.css";

import Chats from "./components/Chats/Chats";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SignupSetup from "./components/SignupSetup/SignupSetup";

import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log("Log In");
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        // console.log("displayName  ----> ", displayName);
        // console.log("email  ----> ", email);
        // console.log("emailVerified  ----> ", emailVerified);
        // console.log("photoURL  ----> ", photoURL);
        // console.log("isAnonymous  ----> ", isAnonymous);
        // console.log("uid  ----> ", uid);
        // console.log("providerData  ----> ", providerData);

        if (displayName) {
          setUserEmail(email);
          setPhotoURL(photoURL);
        }
      } else {
        setUserEmail("");
        // console.log("Log Out");
      }
    });
  });
  return (
    <div className="App">
      {userEmail ? (
        <Chats photoURL={photoURL} userEmail={userEmail} />
      ) : (
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/signup/setup" exact>
            <SignupSetup userEmail={userEmail} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
