import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../../../data/vars";
import "./User.css";

const User = ({
    data,
    activeChatUser,
    showOnline,
    currentUser,
    onClickLister,
    online,
    showBorder,
}) => {
    const [userData, setUserData] = useState(null);

    const getAnotherUser_userId = async () => {
        const anotherUser_Id = await data.members.find(
            (id) => id !== currentUser._id
        ); // return _id of another user
        return anotherUser_Id;
    };

    useEffect(() => {
        if (data && data.members) {
            const getUserData = async () => {
                try {
                    await axios
                        .get(
                            backendURL +
                            "/api/user/byUserId/" +
                            (await data.members.find((id) => id !== currentUser._id))
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
    }, [data, currentUser]);

    return (
        <div className={`message_user `}>
            {/* {activeChatUser && userData && (activeChatUser?.id === userData._id ? "active" : "not active")} */}
            <button
                className={`switch-btn ${!showBorder && "switch-border"} ${userData?._id && activeChatUser && (userData._id === activeChatUser ? "current-active-user" : "not-active-user")} `}
                onClick={onClickLister}
            >
                <div className="message_user_avatar_wrapper">
                    <img
                        className="user_img"
                        src={
                            userData?.profileDetails?.profileURL
                                ? userData.profileDetails.profileURL
                                : "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-512.png"
                        }
                        alt=""
                        width={40}
                        height={40}
                    />
                    {/* <div className="online"></div> */}
                </div>
                <div className="user-name">
                    {userData?.profileDetails?.fname
                        ? userData.profileDetails.fname
                        : "NA"}{" "}
                    {userData?.profileDetails?.lname
                        ? userData.profileDetails.lname
                        : "NA"}
                    <br />

                    {/* {showOnline ? (online ? "Online" : "Offline") : ""} */}

                </div>
            </button>
        </div>
    );
};

export default User;