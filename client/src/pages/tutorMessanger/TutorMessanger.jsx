import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "../../components/tutorMessenger/message/Message/Message";
import User from "../../components/tutorMessenger/user/User";
import "./TutorMessanger.css";

import AppUserContext from "../../context/AppUserContext";
import axios from "axios";
import { backendURL } from "../../data/vars";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";

const TutorMessanger = () => {
  const [searchParams] = useSearchParams();

  const { appUser } = useContext(AppUserContext);
  const [chats, setChats] = useState([]);
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [appUserAllDetails, setAppUserAllDetails] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          backendURL + `/api/chat/${appUser._id}`
        );
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [appUser]);

  // Connect to Socket.io
  useEffect(() => {
    if (appUser?._id) {
      socket.current = io("ws://localhost:8800");
      socket.current.emit("new-user-add", appUser._id);
      socket.current.on("get-users", (users) => {
        // console.log("<== <== <== <== Online users : " + users);
        setOnlineUsers(users);
      });
    }
  }, [appUser]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    if (appUser) {
      socket.current.on("recieve-message", (data) => {
        console.log(data);
        // console.log("=>=>=>=>=>=>=>" + data)
        setReceivedMessage(data);
      });
    }
  }, [appUser]);

  useEffect(() => {
    if (searchParams.get("_id") && appUser) {
      axios
        .get(
          backendURL +
          "/api/chat/find/" +
          searchParams.get("_id") +
          "/" +
          appUser._id
        )
        .then((res) => {
          // alert(res.data);
          setCurrentChat(res.data);
          setActiveChatUser(res.data.members.find((id) => id !== appUser._id));
          console.log("aaaa : " + res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== appUser._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="tutor_messanger_page">
      <div className="page_container">
        <div className="messenger_wrapper">
          <div className="users_wrapper">
            {/* <div className='messaenger_input_wrapper'>
              <input type="text" name="search_user" id="search_user" placeholder='search user' />
            </div> */}
            <div className="messenger_users_list">
              {chats.map((chat, index) => (
                <User
                  onClickLister={() => {
                    setCurrentChat(chat);
                    setActiveChatUser(chat.members.find((member) => member !== appUser._id))
                  }}
                  activeChatUser={activeChatUser}
                  showBorder={true}
                  online={checkOnlineStatus(chat)}
                  data={chat}
                  currentUser={appUser}
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className="main_conatiner">
            {currentChat === null ? (
              <div className="default-message">Select any one user to chat</div>
            ) : (
              <ChatBox
                showBorder={true}
                showOnline={false}
                chat={currentChat}
                currentUser={appUser}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorMessanger;
