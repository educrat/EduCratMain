import React, { useState, useEffect, useRef } from "react";
import { IoIosDocument } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import Message from "../tutorMessenger/message/Message/Message";
import User from "../tutorMessenger/user/User";
import axios from "axios";
import { backendURL } from "../../data/vars";
import { Link } from "react-router-dom";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ChatBox = ({
  chat,
  showBorder,
  showOnline,
  currentUser,
  setSendMessage,
  receivedMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [cloudinaryFile, setCloudinaryFile] = useState([]);

  const sendFileToCLoudnary = () => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "doc-preset");
    data.append("cloud_name", "educrat");
    fetch("https://api.cloudinary.com/v1_1/educrat/image/upload/", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setCloudinaryFile(data.url)
        setNewMessage(data.url, "file", data.original_filename);
        handleSend(data.url);
      })
      .then(() => {
        setNewMessage("");
        setFile(null);
        setUploading(false);
        // setCloudinaryFile([]);
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    // axios.post("")
  }, []);

  const zoomMeeting = () => {
    const data = {
      email: "educratapp@gmail.com",
    };
    axios
      .post(backendURL + "/api/meeting/url", data)
      .then((response) => {
        console.log(response.data);

        window.location.replace(response.data.join_url, "_blank");
      })
      .catch((err) => {
        console.error(err);
        alert(err && err.message);
      });
  };

  // fetching data for header
  useEffect(() => {
    if (chat && chat.members) {
      const getUserData = async () => {
        try {
          await axios
            .get(
              backendURL +
                "/api/user/byUserId/" +
                (await chat.members.find((id) => id !== currentUser._id))
            )
            .then((res) => {
              setUserData(res.data.user);
              // dispatch({ type: "SAVE_USER", data: data })
              console.log(res.data.user);
            });
        } catch (error) {
          console.log(error);
        }
      };

      getUserData();
    }
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await axios.get(backendURL + "/api/message/" + chat._id).then((res) => {
          console.log("******* " + res.data + " " + chat._id);
          setMessages(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Send Message
  const handleSend = async (data, type, filename) => {
    if (type === "file") {
      if (newMessage.length === 0 || newMessage === "") {
        return alert("Plese type something...");
      }
    }

    const message = {
      senderId: currentUser._id,
      text: type === "file" ? <a href={data}>{filename}</a> : data,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser._id);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      await axios
        .post(backendURL + "/api/message", message)
        .then((res) => {
          setMessages([...messages, res.data]);
          setNewMessage("");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <div className="chat-box-container">
      <div className="messanger_current_chat_user">
        <User
          showBorder={false}
          onClickLister={() => {
            // setCurrentChat(chat);
          }}
          showOnline={true}
          data={chat}
          currentUser={currentUser}
        />
      </div>
      <div className="messenger_all_messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            type={
              message.text &&
              message.text.includes("http://res.cloudinary.com/")
                ? "file"
                : "text"
            }
            message={message}
            align={message.senderId !== currentUser._id}
            anotherUserData={userData}
          />
        ))}
      </div>
      {file && (
        <div className="upload-file" style={{ display: "flex" }}>
          <div className="file-name">{file.name}</div>
          <div>
            <button
              className="upload-btn"
              disabled={uploading}
              onClick={sendFileToCLoudnary}
            >
              {uploading ? "Uploading..." : "Send"}
            </button>
          </div>
        </div>
      )}

      <div className="input_message_wrapper">
        <a
          target={"#"}
          onClick={zoomMeeting} /* href="https://meet.google.com/new" */
        >
          <button>
            <svg
              className="icon-wrapper"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h48v48H0V0z" fill="none"></path>
              <path
                d="M34 21v-7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2v-7l8 8V13l-8 8zm-6 5h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"
                fill="#637381"
                class="fill-000000"
              ></path>
            </svg>
          </button>
        </a>

        {/* <a target={"_blank"} href={"https://docs.google.com/forms/u/0/"}>
          <button>
            <svg
              width="26"
              height="26"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#637381" class="fill-231f20">
                <path d="M68 17h-1v-1.5c0-1.1-.9-1.5-2-1.5H54c0-3-1.791-4-4-4s-4 1-4 4H35c-1.1 0-2 .4-2 1.5V17h-1c-6.617 0-12 4.883-12 11.5v50C20 85.117 25.383 91 32 91h36c6.617 0 12-5.883 12-12.5v-50C80 21.883 74.617 17 68 17zm-18-5.5a2 2 0 1 1-.001 4.001A2 2 0 0 1 50 11.5zm26 67c0 4.411-3.589 8.5-8 8.5H32c-4.411 0-8-4.089-8-8.5v-50c0-4.411 3.589-7.5 8-7.5h1l-1 4c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2l-1-4h1c4.411 0 8 3.089 8 7.5v50z"></path>
                <path d="M42 41h26v4H42zM42 57h26v4H42zM42 73h26v4H42zM29 47h10V37H29v10zm2-8h6v6h-6v-6zM29 62h10V52H29v10zm2-8h6v6h-6v-6zM29 78h10V68H29v10zm2-8h6v6h-6v-6z"></path>
                <path d="M32 71h4v4h-4z"></path>
              </g>
            </svg>
          </button>
        </a> */}

        <button>
          <label for={`file-input-selector`} style={{ cursor: "pointer" }}>
            <svg
              height="26"
              width="22"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 31a6 6 0 0 1-6-6V9a8 8 0 0 1 16 0v19a1 1 0 0 1-2 0V9a6 6 0 0 0-12 0v16a4 4 0 0 0 8 0V10a2 2 0 0 0-4 0v13a1 1 0 0 1-2 0V10a4 4 0 0 1 8 0v15a6 6 0 0 1-6 6Z"
                data-name="Layer 43"
                fill="#637381"
                class="fill-101820"
              ></path>
            </svg>
          </label>
        </button>
        <input
          type="file" /*  accept="image/*" */ /* multiple={true} */
          style={{ display: "none" }}
          id={`file-input-selector`}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {/* <button>
          <svg
            height="30"
            width="26"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="1">
              <path
                d="M257.71 450c-110.81 0-201-90.15-201-201s90.15-201 201-201 201 90.16 201 201-90.18 201-201 201Zm0-371.94c-94.27 0-171 76.7-171 171s76.69 171 171 171 171-76.7 171-171-76.71-171-171-171Z"
                fill="#637381"
                class="fill-000000"
              ></path>
              <path
                d="M257.71 377.79a72 72 0 0 1-71.87-71.88 15 15 0 0 1 30 0A41.88 41.88 0 1 0 257.71 264a71.88 71.88 0 1 1 71.88-71.88 15 15 0 1 1-30 0A41.88 41.88 0 1 0 257.71 234a71.88 71.88 0 0 1 0 143.76Z"
                fill="#637381"
                class="fill-000000"
              ></path>
              <path
                d="M257.71 405.09a15 15 0 0 1-15-15V108a15 15 0 0 1 30 0v282.09a15 15 0 0 1-15 15Z"
                fill="#637381"
                class="fill-000000"
              ></path>
            </g>
          </svg>
        </button> */}

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={(e) => handleSend(newMessage)}>
          <svg
            className="icon-wrapper"
            viewBox="0 0 23 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m.5 18 21-9-21-9v7l15 2-15 2v7Z"
              fill="#637381"
              fill-rule="evenodd"
              class="fill-000000"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
