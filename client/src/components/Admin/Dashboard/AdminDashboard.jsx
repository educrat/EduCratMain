import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppUserContext from "../../../context/AppUserContext";
import { backendURL } from "../../../data/vars";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const { appUser } = useContext(AppUserContext);
  const navigate = useNavigate();

  const [allUserData, setAllUserData] = React.useState();
 
  const [totalEarning, setTotalEarning] = React.useState(0);

  useEffect(() => {
    if (appUser?._id) {
      if (appUser?.role !== 2) {
        return;
      }

      console.log("Admin Dashboard");

      axios
        .get(backendURL + "/api/admin/allUsers")
        .then((res) => {
          console.log(res.data);
          setAllUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(backendURL + "/api/admin/txns")
        .then((res) => {
          setTotalEarning(0);
          console.log(res.data);
          res.data.forEach((txn) => {
            setTotalEarning(
              (prev) => prev + parseInt((20 / 100) * parseInt(txn.txn_amount))
            );
            console.log(txn.amount);
            console.log(typeof txn.amount);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [appUser]);

  return (
    <div className="admin-dashboard-container">
      <h1 className="heading">Admin Dashboard</h1>

      <div className="admin-earning-container">
        {/* it is less amount because txn_amount attribute is added late in payment model  */}
        {/* 20% from each tutor has been taken as maintenance fee */}
        <h3>Total Earnings : </h3> <h2>{totalEarning}$</h2>
      </div>

      <br />
      <br />

      <div className="admin-dashboard-info">
        {allUserData?.map((user, index) => {
          return (
            <details key={index}>
              <summary>
                <div>username: {user?.username}</div>
                <div>fname: {user?.profileDetails?.fname}</div>
                <div>lname: {user?.profileDetails?.lname}</div>
                <div>email: {user?.email}</div>
                <div>
                  role: {user.role && user.role === 0 && "student"}
                  {user.role && user.role === 1 && "tutor"}
                </div>
              </summary>

              <p>
                {user.gigsInfo.length > 0 && (
                  <div>
                    <br />
                    <br />
                    <h3 className="title"> Gigs Information :</h3>

                    <br />
                    {user.gigsInfo &&
                      user.gigsInfo.map((gig, index) => {
                        return (
                          <div key={index}>
                            <h4>GIG NO: {index + 1}</h4>
                            <div>
                              <div>TITLE : {gig.title}</div>
                              <div>level : {gig.level}</div>
                              <div>lang : {gig.language}</div>
                              <div>
                                {gig.pricing && (
                                  <>
                                    <div>
                                      currentPrice : {gig.pricing.currentPrice}
                                    </div>
                                    <div>
                                      actialPrice : {gig.pricing.actualPrice}
                                    </div>
                                    <div>discount : {gig.pricing.discount}</div>
                                  </>
                                )}
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        );
                      })}
                  </div>
                )}

                {user.gigBuyers && user.gigBuyers.length > 0 && (
                  <div>
                    <br />
                    <h3> Gig Buyers Information :</h3>
                    <br />

                    {user.gigBuyers &&
                      user.gigBuyers.map((gigBuyer, index) => {
                        return (
                          <div key={index}>
                            <div>
                              <h4> GIG BUYER NO: {index + 1}</h4>
                            </div>
                            <div>
                              <div>
                                username : {gigBuyer?.student_id?.username}
                              </div>
                              <div>gigPrice : {gigBuyer?.gigPrice}</div>
                              <div>
                                razorpay_order_id :{" "}
                                {gigBuyer?.razorpay_order_id}
                              </div>
                            </div>
                            <div>
                              <h4> &nbsp; &nbsp; &gt; Purchased Gig Info : </h4>
                              <div>
                                {" "}
                                &nbsp; &nbsp; gig_id : {gigBuyer?.gig_id?._id}
                              </div>
                              <div>
                                {" "}
                                &nbsp; &nbsp; title : {gigBuyer?.gig_id?.title}
                              </div>
                              <div>
                                {" "}
                                &nbsp; &nbsp; level : {gigBuyer?.gig_id?.level}
                              </div>
                            </div>
                            <br />
                          </div>
                        );
                      })}
                  </div>
                )}

                <br />

                {user.gigBuyed &&
                  user.gigBuyed.length > 0 &&
                  user.gigBuyed &&
                  user.gigBuyed.map((gigBuyed, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <h4> GIG BOUGHT NO: {index + 1}</h4>
                        </div>
                        <div>
                          <div>username : {gigBuyed?.tutor_id?.username}</div>
                          <div>gigPrice : {gigBuyed?.gigPrice}</div>
                          <div>
                            razorpay_order_id : {gigBuyed?.razorpay_order_id}
                          </div>
                        </div>
                        <div>
                          <h4> &nbsp; &nbsp; &gt; Purchased GIG Info : </h4>
                          <div>
                            {" "}
                            &nbsp; &nbsp; gig_id : {gigBuyed?.gig_id?._id}
                          </div>
                          <div>
                            {" "}
                            &nbsp; &nbsp; title : {gigBuyed?.gig_id?.title}
                          </div>
                          <div>
                            {" "}
                            &nbsp; &nbsp; level : {gigBuyed?.gig_id?.level}
                          </div>
                        </div>
                        <br />
                      </div>
                    );
                  })}
              </p>

              {/* <hr /> */}
              {/* <br /> */}
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
