import React, { useState, useEffect } from "react";
import "./Chats.css";

import { FontAwesomeIcon, faPaperPlane, faSignOutAlt } from "../../Fontawesome";
import { firebase, db, auth } from "../../firebase";
import Message from "../Message/Message";

import { css } from "emotion";
import ScrollToBottom from "react-scroll-to-bottom";

function Chats({ userEmail, photoURL }) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  // console.log(messages);

  const ROOT_CSS = css({
    height: "calc(100vh - 84px)",
    // width: 400,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      profileEmail: userEmail,
      profileImage: photoURL,
      message: messageInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessageInput("");
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  return (
    <div className="container chat__mainContainer">
      <div className="chat__header">
        <div>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ cursor: "pointer" }}
            onClick={() => auth.signOut()}
          />
        </div>
      </div>
      <ScrollToBottom className={ROOT_CSS}>
        <div className="chat ">
          {messages.map((message) => (
            <Message
              key={message.id}
              mainEmail={userEmail}
              id={message.id}
              message={message.post.message}
              profileImage={message.post.profileImage}
              profileEmail={message.post.profileEmail}
              timestamp={message.post.timestamp}
            />
          ))}
        </div>
      </ScrollToBottom>
      <div className="chat__input">
        <form
          action=""
          className="chat__inputText_form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="chat__inputText"
            placeholder="Type a message..."
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
          />
          <button className="chat__inputText_button" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
