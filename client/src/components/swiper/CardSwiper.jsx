// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./CardSwiper.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import cards from "../../data/cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../data/vars";

export default function CardSwiper({ gigDetails, mode, category }) {
  const [allGigDetails, setAllGigDetails] = useState([]);
  const [allUserDetails, setAllUserDetails] = useState([]);

  useEffect(() => {
    console.log(mode);
    if (mode === "gig-keywords") {
      // used on tutorGigPage.jsx to show gigs as per keywords
      if (gigDetails && gigDetails.keywords) {
        console.log(">> gig-keywords mode is executing");
        setAllGigDetails([]);
        setAllUserDetails({});
        gigDetails.keywords.map(async (keyword) => {
          await axios
            .get(backendURL + "/api/gig-by-keyword/" + keyword)
            .then((res) => {
              console.log(res.data);
              setAllGigDetails([...allGigDetails, ...res.data.gigs]);
              setAllUserDetails({ ...allUserDetails, ...res.data.users });
            })
            .catch((err) => console.log(err));
        });
      }
    } else if (mode === "suggestions") {
      // used on dashboard page
      setAllGigDetails([]);
      setAllUserDetails({});
      console.log(">> suggestions mode is executing");
      axios.get(backendURL + "/api/gig-suggestion").then((res) => {
        console.log(res.data);
        setAllGigDetails([...allGigDetails, ...res.data.gigs]);
        setAllUserDetails({ ...allUserDetails, ...res.data.users });
      });
    } else if (mode === "gig-category") {
      axios
        .get(backendURL + "/api/gig-by-catgory/" + category)
        .then((res) => {
          console.log(res.data);
          setAllGigDetails([...allGigDetails, ...res.data.gigs]);
          setAllUserDetails({ ...allUserDetails, ...res.data.users });
        })
        .catch((err) => console.log(err));
    }
  }, [gigDetails, mode, category]);

  return (
    <div>
      <div className="card_swiper_container">
        <Swiper
          // slidesPerView={4}
          breakpoints={{
            300: {
              width: 250,
              slidesPerView: 1,
            },
            400: {
              width: 500,
              slidesPerView: 2,
            },
            500: {
              width: 800,
              slidesPerView: 3,
              slidesPerGroup: 2,
            },
            700: {
              width: 1100,
              slidesPerView: 4,
              slidesPerGroup: 3,
            },
          }}
          spaceBetween={20}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-container"
        >
          {allGigDetails.map((gig, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Link
                className="student_dashboard_gig_link"
                to={"/tutor-gig/" + gig._id}
              >
                <img
                  className="swiper_card_img"
                  src={
                    gig.images[0]
                      ? gig.images[0]
                      : "https://placehold.jp/800x250.png"
                  }
                  alt=""
                />
                <div className="avatar_wrapper">
                  <img
                    className="avatar_img"
                    src={
                      allUserDetails[gig.userId]
                        ? allUserDetails[gig.userId].profileURL
                        : "https://placehold.jp/800x250.png"
                    }
                    alt=""
                  />
                  <div className="avatar_name">
                    {allUserDetails[gig.userId].fname}{" "}
                    {allUserDetails[gig.userId].lname}
                  </div>
                </div>
                <div className="course_wrapper">
                  <div className="course_name">{gig.language}</div>
                  <div className="course_price">
                    ${gig.pricing ? gig.pricing.currentPrice : "0"}
                  </div>
                </div>
                <div className="gig_wrapper">
                  <Link className="gig_title" to={"/dashboard"}>
                    <span>{gig.title.slice(0, 50) + "..."}</span>
                  </Link>
                </div>
                <div className="around_wrapper">
                  <div className="rating-container">
                    <div className="star_wrapper">
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
                        ></path>
                      </svg>
                    </div>
                    <div className="rating">5.0</div>
                  </div>
                  <div className="student-count">(2.1k)</div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
