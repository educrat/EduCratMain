import React, { useEffect, useState } from "react";
import "./SearchGig.css";
import GigPreview from "../../components/gigPreview/GigPreview";
import axios from "axios";
import { backendURL } from "../../data/vars";
import { useSearchParams } from "react-router-dom";
import SearchUserPreview from "../../components/SearchUserPreview/SearchUserPreview";

const SearchGig = () => {
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState({});

  useEffect(() => {
    setResponse({});
    axios
      .get(backendURL + "/api/search?q=" + searchParams.get("q"))
      .then((res) => {
        setResponse({
          gigs: [...res.data.gig],
          gigUsers: { ...res.data.gigUsers },
          profiles: [...res.data.profile],
          users: [...res.data.user],
        });
      });
  }, [searchParams]);

  return (
    <div className="search-page">
      <div className="result-heading">
        Results for "{searchParams.get("q")}"
      </div>
      <div className="search-count">
        {response && response.gigs && response.gigs.length} services available
      </div>
      <div className="gig-wrapper">
        {response &&
          response.gigs &&
          response.gigs.map((gigDetails, index) => (
            <GigPreview
              key={index}
              gigUsers={response.gigUsers}
              gigDetails={gigDetails}
            />
          ))}
      </div>
      <br />
      <hr />
      <br />
      <div className="search-count1">
        {response &&
          response.users &&
          (response.users.length <= 0 ? "NO" : response.users.length)}{" "}
        users available
      </div>
      <div className="search-gig-users-wrapper">
        {response.users &&
          response.users.map((user, index) => (
            <SearchUserPreview
              className="check"
              key={index}
              query={searchParams.get("q")}
              userDetails={user}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchGig;
