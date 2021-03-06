import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

export const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);


  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
      {msg.media ?
      <>
          <img src={msg.media} alt={msg.text}   /> <br /> 
      </>
   : null}
      <p className={msg.from === user1 ? "me" : "friend"} id='text1'>
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

