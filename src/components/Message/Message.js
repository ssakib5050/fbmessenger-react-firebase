import React from "react";
import "./Message.css";

function Message({
  id,
  message,
  profileImage,
  mainEmail,
  profileEmail,
  timestamp,
}) {
  // console.log(profileEmail);
  // const username = "test";

  return (
    <>
      <div
        className={`leftMessage ${
          mainEmail === profileEmail
            ? "leftMessage_rightMessage"
            : "flex-row-reverse"
        }`}
      >
        <div
          className={`leftMessage__message ${
            mainEmail === profileEmail
              ? "leftMessage__message_rightMessage"
              : ""
          }`}
        >
          <p className="mb-0">{message}</p>
        </div>
        <div
          className={`leftMessage__img_wrap ${
            mainEmail === profileEmail ? "d-none" : ""
          }`}
        >
          <img src={profileImage} alt="" className="leftMessage__img" />
        </div>
      </div>
    </>
  );
}

export default Message;
