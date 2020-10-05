import React, { useState, useEffect } from "react";
import "./Chats.css";

import { FontAwesomeIcon, faPaperPlane } from "../../Fontawesome";
import { firebase, db } from "../../firebase";
import Message from "../Message/Message";

import { css } from "emotion";
import ScrollToBottom from "react-scroll-to-bottom";

function Chats() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(messages);

  const ROOT_CSS = css({
    height: "calc(100vh - 47px)",
    // width: 400,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      profileUsername: "test",
      profileImage: "test",
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
      <ScrollToBottom className={ROOT_CSS}>
        <div className="chat ">
          {messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              message={message.post.message}
              profileImage={message.post.profileImage}
              profileUsername={message.post.profileUsername}
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
