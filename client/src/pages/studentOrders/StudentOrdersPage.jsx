import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppUserContext from "../../context/AppUserContext";
import { backendURL } from "../../data/vars";
import AskForRevisionModal from "../../components/Modals/AskForRevisionModal";
import ConfirmOrderComplete from "../../components/Modals/ConfirmOrderComplete";

import "./StudentOrderPage.css";
import ConfirmRevisionComplete from "../../components/Modals/ConfirmRevisionComplete";

const StudentOrdersPage = () => {
  const { appUser } = useContext(AppUserContext);

  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmRevisionComplete, setIsOpenConfirmRevisionComplete] =
    useState(false);
  const [isOpenConfirmOrderComplete, setIsOpenConfirmOrderComplete] =
    useState(false);
  const [revisonMessage, setRevisonMessage] = useState("");
  const [revisionData, setRevisionData] = useState({});

  useEffect(() => {
    if (appUser?._id) {
      axios
        .get(backendURL + "/api/orders/tutor/" + appUser._id)
        .then((res) => {
          console.log(res.data);
          setOrders(res.data.gigBuyers);
          setFeedbacks(res.data.gigBuyers.feedbackInfo);
          console.log(res.data.gigBuyers.feedbackInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [appUser, refreshData]);

  const requestRevisonOnClickListner = async (
    tutorId,
    tuteeId,
    gigId,
    feedbackId,
    feedbackUID
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
      feedbackUID: feedbackUID,
    });
    setIsOpen(true);
  };

  const revisonCompletedOnClickListner = async (
    tutorId,
    tuteeId,
    gigId,
    feedbackId,
    feedbackUID
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
      feedbackUID: feedbackUID,
    });

    setIsOpenConfirmRevisionComplete(true);
  };

  const completeOrderOnClickListner = async (
    tutorId,
    tuteeId,
    gigId,
    feedbackId,
    feedbackUID
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
      feedbackUID: feedbackUID,
    });

    setIsOpenConfirmOrderComplete(true);
  };

  return (
    <div className="stu_order_table_container">
      <br />
      <h1 style={{ textAlign: "center" }}>Student Order Page</h1>
      <br />

      {/* NOTE: isOpen is to ask the revision in revision modal */}
      {isOpen && (
        <AskForRevisionModal
          setIsOpen={setIsOpen}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          revisionData={revisionData}
          setRevisionData={setRevisionData}
          revisonMessage={revisonMessage}
          setRevisonMessage={setRevisonMessage}
        />
      )}

      {isOpenConfirmRevisionComplete && (
        <ConfirmRevisionComplete
          setIsOpenConfirmRevisionComplete={setIsOpenConfirmRevisionComplete}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          setRevisionData={setRevisionData}
          revisionData={revisionData}
          revisonMessage={revisonMessage}
          setRevisonMessage={setRevisonMessage}
        />
      )}

      {isOpenConfirmOrderComplete && (
        <ConfirmOrderComplete
          setIsOpenConfirmOrderComplete={setIsOpenConfirmOrderComplete}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          revisionData={revisionData}
          setRevisionData={setRevisionData}
          revisonMessage={revisonMessage}
          setRevisonMessage={setRevisonMessage}
        />
      )}

      <div className="responsive-table" style={{ overflowX: "scroll" }}>
        <div className="table_wrapper">
          <table className="stu_order_table">
            <thead className="order_th">
              <th style={{ width: "13%" }}>
                <div className="gig_thead_th-1">TUTOR</div>
              </th>
              <th style={{ width: "26%" }}>
                <div className="gig_thead_th-1">GIG</div>
              </th>
              <th className="gig_thead_th-1" style={{ width: "18%" }}>
                STATUS
              </th>
              <th className="gig_thead_th-1" style={{ width: "18%" }}>
                REVISION
              </th>
              <th className="gig_thead_th-1" style={{ width: "18%" }}>
                ACTION
              </th>
              {/* <th className="due-head">DUE ON</th> */}
              <th className="total-head" style={{ width: "7%" }}>
                TOTAL
              </th>
              {/* <th className="status-head">STATUS</th> */}
            </thead>
            <tbody className="order_th">
              {orders?.gigBuyed?.map((order) => {
                return (
                  <tr className="table_row" style={{ width: "100%" }}>
                    <td className="order_table_avatar_wrapper">
                      <div className="order_user_detail">
                        <div>
                          <img
                            width={28}
                            src={order?.tutor_id?.profileImage}
                            alt=""
                          />
                        </div>
                        <div>
                          <Link to={"/profile/" + order?.tutor_id?._id}>
                            <div className="order_table_student_name">
                              {order?.tutor_id?.username}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="order_table_gig_title">
                      <Link to={"/tutor-gig/" + order?.gig_id?._id}>
                        <div>
                          {order?.gig_id?.title
                            ? order.gig_id.title.slice(0, 40)
                            : "NA"}{" "}
                          {order?.gig_id?.title.length > 40 && "..."}
                        </div>
                      </Link>
                    </td>
                    <td>
                      {feedbacks &&
                        feedbacks.length > 0 &&
                        feedbacks.map((feedback) => {
                          if (
                            feedback?.gigId === order?.gig_id?._id &&
                            feedback?.tuteeId === appUser?._id &&
                            feedback?.tutorId === order?.tutor_id?._id
                          ) {
                            return (
                              <span className="order_table_action_btn">
                                {feedback.tutorSideCompleted
                                  ? "Teacher marked complete"
                                  : feedback.status}
                              </span>
                            );
                          }
                        })}
                    </td>
                    <td>
                      {feedbacks &&
                        feedbacks.length > 0 &&
                        feedbacks.map((feedback) => {
                          if (
                            feedback?.gigId === order?.gig_id?._id &&
                            feedback?.tuteeId === appUser?._id &&
                            feedback?.tutorId === order?.tutor_id?._id
                          ) {
                            return (
                              <span className="order_table_action_btn">
                                {feedback?.revisionMessage || "NA"}
                              </span>
                            );
                          }
                        })}
                    </td>
                    <td className="order_table_actions">
                      {feedbacks &&
                        feedbacks.length > 0 &&
                        feedbacks.map((feedback) => {
                          if (
                            feedback?.gigId === order?.gig_id?._id &&
                            feedback?.tuteeId === appUser?._id &&
                            feedback?.tutorId === order?.tutor_id?._id
                          ) {
                            if (feedback.status === "in progress")
                              return (
                                <>
                                  <button
                                    className="order_table_action_btn primaryBtn"
                                    onClick={() =>
                                      requestRevisonOnClickListner(
                                        feedback?.tutorId?._id,
                                        feedback?.tuteeId?._id,
                                        feedback?.gigId?._id,
                                        feedback?._id,
                                        feedback.uid
                                      )
                                    }
                                  >
                                    Request Revision
                                  </button>{" "}
                                  <br />
                                  <button
                                    className="order_table_action_btn"
                                    onClick={() =>
                                      completeOrderOnClickListner(
                                        feedback?.tutorId?._id,
                                        feedback?.tuteeId?._id,
                                        feedback?.gigId?._id,
                                        feedback?._id,
                                        feedback?.uid
                                      )
                                    }
                                  >
                                    Complete Order{" "}
                                    {/* onlcick mark status="completed" */}
                                  </button>
                                </>
                              );

                            if (feedback.status === "under revision")
                              return (
                                <>
                                  <button
                                    className="order_table_action_btn primaryBtn"
                                    onClick={() =>
                                      revisonCompletedOnClickListner(
                                        feedback?.tutorId?._id,
                                        feedback?.tuteeId?._id,
                                        feedback?.gigId?._id,
                                        feedback?._id,
                                        feedback?.uid
                                      )
                                    }
                                  >
                                    Complete Revision
                                  </button>{" "}
                                  {/* onlcick mark status="in progress" */}
                                </>
                              );

                            if (feedback.status === "completed")
                              return (
                                <Link
                                  to={"/user/student/feedback/" + feedback?._id}
                                >
                                  <button className="order_table_action_btn">
                                    Give feedback{" "}
                                    {/* onlcick mark status="under revision" */}
                                  </button>
                                </Link>
                              );
                          }
                        })}
                    </td>
                    <td className="order_table_price">
                      $
                      {
                        /* order?.gig_id?.pricing?.actualPrice
                      ? order?.gig_id?.pricing?.actualPrice  :  */
                        order?.gigPrice
                      }
                    </td>
                    {/* <td className="">
                      <button className="order_table_status_btn">{order.status}</button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentOrdersPage;
