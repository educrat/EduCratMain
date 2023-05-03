import React from "react";
import "./UserDescription.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserDetails = ({ userData }) => {
  const [diableInput, setDiableInput] = useState(true);
  const [desc, setdesc] = useState("ahoga oahgoo oaosf");

  return (
    <div className="user_description_details_wrapper ">
      <div className="more_details">
        <div className="details_container">
          <div className="title_wrapper">Description</div>
        </div>
        {/* <Link className="description_btn" to={"/profile"}>
          {!diableInput ? (
            <button
              onClick={(e) => {
                setDiableInput(true);
                alert("data saved");
              }}
            >
              save
            </button>
          ) : (
            <button
              onClick={(e) => {
                setDiableInput(false);
              }}
            >
              {!diableInput ? "save" : "edit"}
            </button>
          )}
        </Link> */}
      </div>
      <div className="description_wrapper">
        <div className="user_desc">{userData && userData.profileDetails && userData.profileDetails.desc}</div>
      </div>

      <div className="line_break">&nbsp;</div>

      <div className="user_links_container">
        <div className="user_links_title">Languages</div>
        <div className="user_langs">
          {
            userData && userData.profileDetails && userData.profileDetails.languages.map((langDetails, index) => <>
              <div key={index}>{langDetails.lang}</div> <div>-</div> <div>{langDetails.level}</div>
            </>
            )
          }
          {/* <div>English</div> <div>-</div> <div>Intermediate</div>
          <div>Hindi</div> <div>-</div> <div>Professional</div>
          <div>Marathi</div> <div>-</div> <div>Professional</div> */}
        </div>
      </div>

      <div className="line_break">&nbsp;</div>

      <div className="user_links_container">
        <div className="user_links_title">Skills</div>
        <div className="user_skill_btn_wrapper">
          {
            userData && userData.profileDetails && userData.profileDetails.skills.map((skillDetails, index) =>
              <button key={index} className="user_skill_btn">{skillDetails.skill}</button>
            )
          }
          {/* <button className="user_skill_btn">HTML</button>
          <button className="user_skill_btn">CSS</button>
          <button className="user_skill_btn">JavaScript</button>
          <button className="user_skill_btn">React</button>
          <button className="user_skill_btn">Nodejs</button>
          <button className="user_skill_btn">MongoDB</button>
          <button className="user_skill_btn">HTML</button>
          <button className="user_skill_btn">CSS</button>
          <button className="user_skill_btn">JavaScript</button>
          <button className="user_skill_btn">React</button> */}
        </div>
      </div>

      <div className="line_break">&nbsp;</div>
      <div className="user_links_container">
        <div className="user_links_title">Certificates</div>
        <div className="user_certificate_wrapper">
          {
            userData && userData.profileDetails && userData.profileDetails.certification.map((certDetails, index) =>
              <div className="user_cert" key={index}>
                {certDetails.title} <br />
                <span className="cert_details">{certDetails.from} - {certDetails.year}</span>
              </div>
            )
          }
          {/* <div className="user_cert">
            C Programming <br />
            <span className="cert_details">Mumbai University - 2020</span>
          </div>
          <div className="user_cert">
            C Programming <br />
            <span className="cert_details">Mumbai University - 2020</span>
          </div>
          <div className="user_cert">
            C Programming <br />
            <span className="cert_details">Mumbai University - 2020</span>
          </div> */}
        </div>
      </div>


      {/* <div className="user_links_container">
        <div className="user_links_title">Skills</div>
        <div className="user_links_wrapper">
          <div className="logo_wrapper">
            <svg
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
            >
              <path
                d="M449.446 0C483.971 0 512 28.03 512 62.554v386.892C512 483.97 483.97 512 449.446 512H342.978V319.085h66.6l12.672-82.621h-79.272v-53.617c0-22.603 11.073-44.636 46.58-44.636H425.6v-70.34s-32.71-5.582-63.982-5.582c-65.288 0-107.96 39.569-107.96 111.204v62.971h-72.573v82.621h72.573V512H62.554C28.03 512 0 483.97 0 449.446V62.554C0 28.03 28.029 0 62.554 0h386.892Z"
                fill="#1777f1"
                className="fill-1777f2"
              ></path>
            </svg>
          </div>
          <div className="user_link">www.facebook.com</div>
        </div>
        <div className="user_links_wrapper">
          <div className="logo_wrapper">
          <svg viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 26.5h-25a2 2 0 0 1-2-2v-17a2 2 0 0 1 2-2h25a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2z" fill="#fffff1" className="fill-ffffff"></path><path d="M29.64 8.973 16 18.305 2.36 8.973a1.988 1.988 0 0 1-.267-.235H2.08l17.715 17.716h8.728c1.088 0 1.978-.89 1.978-1.977V7.341a1.979 1.979 0 0 1-.861 1.632z" fill="#ECEFF1" className="fill-eceff1"></path><path d="M30.5 7v17.542a1.958 1.958 0 0 1-1.958 1.958H27V7h3.5zM1.5 7v17.542c0 1.082.877 1.958 1.958 1.958H5V7H1.5z" fill="#FF8A80" className="fill-ff8a80"></path><path d="M28.522 5.364 16 13.932 3.478 5.364c-1.088 0-1.978.89-1.978 1.977 0 .677.341 1.275.86 1.631L16 18.305l13.64-9.333c.519-.356.86-.954.86-1.631 0-1.087-.89-1.977-1.978-1.977z" fill="#FF8A80" className="fill-ff8a80"></path><path d="M28.5 27h-25A2.503 2.503 0 0 1 1 24.5v-17a.5.5 0 0 1 1 0v17c0 .827.673 1.5 1.5 1.5h25c.827 0 1.5-.673 1.5-1.5v-17c0-.827-.673-1.5-1.5-1.5a.5.5 0 0 1 0-1C29.878 5 31 6.122 31 7.5v17c0 1.378-1.122 2.5-2.5 2.5z" fill="#455A64" className="fill-455a64"></path><path d="M16 19a.5.5 0 0 1-.284-.088L2.066 9.498A2.466 2.466 0 0 1 1 7.467 2.47 2.47 0 0 1 3.467 5h25.065a2.467 2.467 0 0 1 1.402 4.498l-13.65 9.414A.5.5 0 0 1 16 19zM3.467 6a1.469 1.469 0 0 0-.833 2.675L16 17.893l13.366-9.218A1.467 1.467 0 0 0 28.533 6H3.467z" fill="#455A64" className="fill-455a64"></path></svg>
          </div>
          <div className="user_link">www.youremail.com</div>
        </div>
        <div className="user_links_wrapper">
          <div className="logo_wrapper">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient cx="-578.95" cy="-837.6" gradientTransform="matrix(.75 0 0 .75 499.5 629.5)" gradientUnits="userSpaceOnUse" id="a" r="197.06"><stop offset="0" stop-color="#f9ed32" className="stop-color-f9ed32"></stop><stop offset=".36" stop-color="#ee2a7b" className="stop-color-ee2a7b"></stop><stop offset=".44" stop-color="#d22a8a" className="stop-color-d22a8a"></stop><stop offset=".6" stop-color="#8b2ab2" className="stop-color-8b2ab2"></stop><stop offset=".83" stop-color="#1b2af0" className="stop-color-1b2af0"></stop><stop offset=".88" stop-color="#002aff" className="stop-color-002aff"></stop></radialGradient></defs><g data-name="3-instagram"><rect height="64" rx="11.2" ry="11.2" transform="rotate(180 32 32)" width="64" fill="url(#a)" className="fillurl(-a)"></rect><path d="M44 56H20A12 12 0 0 1 8 44V20A12 12 0 0 1 20 8h24a12 12 0 0 1 12 12v24a12 12 0 0 1-12 12ZM20 12.8a7.21 7.21 0 0 0-7.2 7.2v24a7.21 7.21 0 0 0 7.2 7.2h24a7.21 7.21 0 0 0 7.2-7.2V20a7.21 7.21 0 0 0-7.2-7.2Z" fill="#fffff1" className="fill-ffffff"></path><path d="M32 45.6A13.6 13.6 0 1 1 45.6 32 13.61 13.61 0 0 1 32 45.6Zm0-22.4a8.8 8.8 0 1 0 8.8 8.8 8.81 8.81 0 0 0-8.8-8.8Z" fill="#fffff1" className="fill-ffffff"></path><circle cx="45.6" cy="19.2" r="2.4" fill="#fffff1" className="fill-ffffff"></circle></g></svg>
          </div>
          <div className="user_link">www.instagram.com</div>
        </div>
      </div> */}
    </div>
  );
};

export default UserDetails;
