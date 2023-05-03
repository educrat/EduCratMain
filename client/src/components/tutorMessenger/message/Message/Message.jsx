import React, { useContext, useEffect, useRef } from "react";
import "./Message.css";
import { format } from "timeago.js";
import AppUserContext from "../../../../context/AppUserContext";

const Message = ({
  scrollRef,
  align,
  message,
  type,
  user,
  anotherUserData,
  currentUser,
}) => {
  const { appUser } = useContext(AppUserContext);
  const scroll = useRef();

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, appUser]);

  return (
    <div
      className={`message_wrapper `}
      ref={scroll}
      style={{
        justifyContent: `${align ? "start" : "end"}`,
        flexDirection: `${align ? "cloumn-reverse" : "row-reverse"}`,
      }}
    >
      <div className="avatar-wrapper">
        <img
          // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          src={
            align
              ? user?.profileDetails?.profileURL
                ? user.profileDetails.profileURL
                : "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-512.png"
              : appUser &&
                appUser.profileDetails &&
                appUser.profileDetails.profileURL
          }
          width={30}
          height={30}
          alt=""
        />
      </div>
      <div className="message_content">
        <div className={`timestamp ${align ? "text-left" : "text-right"}`}>
          {format(message && message.createdAt)}
        </div>
        {/* <br /> */}
        <div
          className="message"
          style={{
            backgroundColor: `${align ? "#f4f6f8" : "#c8facd"}`,
          }}
        >
          {message &&
            message.text &&
            (type === "text" ? (
              message.text
            ) : (
              <a target={"_blank"} href={message.text}>
                {message.filename ? message.filename : "FILE"}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
