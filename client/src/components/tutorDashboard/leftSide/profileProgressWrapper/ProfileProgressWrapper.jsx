import React, { useEffect } from 'react'
import './profileProgressWrapper.css';

const ProfileProgressWrapper = ({userData, overallRating, ratingCount}) => {

    return (
        <div className="profile_details_wrapper ">
            <div className="name_rating">
                <div className="avatar_container">
                    <div className="dashboard_avatar_wrapper">
                        <img
                            className="avatar_img"
                            alt=""
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        />John Doe
                    </div>
                    <div className='avatar_name'></div>
                </div>

                <br />
                <hr />
                <br />

                <div className="star_rating_container">
                    <div className="star_rating">
                        <svg
                            baseProfile="tiny"
                            version="1.2"
                            viewBox="0 0 24 24"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m9.362 9.158-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19a.496.496 0 0 0 .734.534c1.844-1.048 4.606-2.624 4.606-2.624l4.604 2.625c.168.092.378.09.541-.029a.5.5 0 0 0 .195-.505l-1.071-5.191 3.919-3.566a.499.499 0 0 0-.28-.865c-2.108-.236-5.269-.586-5.269-.586l-2.183-4.83a.499.499 0 0 0-.909 0l-2.183 4.83z"
                                fill="#fff000"
                                className="fill-000000"
                            >
                            </path>
                        </svg>
                    </div>
                    <span>
                        {Number.parseFloat(overallRating)/Number.parseFloat(ratingCount)} ({ratingCount})
                    </span>
                </div>
            </div>




        </div>

    )
}

export default ProfileProgressWrapper