import React from "react";
import "./Message.css";

function Message({ id, message, profileImage, profileUsername, timestamp }) {
  console.log(profileUsername);
  const username = "test";

  return (
    <>
      <div
        className={`leftMessage ${
          username === profileUsername
            ? "leftMessage_rightMessage"
            : "flex-row-reverse"
        }`}
      >
        <div
          className={`leftMessage__message ${
            username === profileUsername
              ? "leftMessage__message_rightMessage"
              : ""
          }`}
        >
          <p className="mb-0">{message}</p>
        </div>
        <div className="leftMessage__img_wrap">
          <img src={profileImage} alt="" className="leftMessage__img" />
        </div>
      </div>
    </>
  );
}

export default Message;
