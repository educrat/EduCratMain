import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppUserContext from "../../../context/AppUserContext";
import { backendURL } from "../../../data/vars";
import AskForRevisionModal from "../../Modals/AskForRevisionModal";
import ConfirmOrderComplete from "../../Modals/ConfirmOrderComplete";
import ConfirmRevisionComplete from "../../Modals/ConfirmRevisionComplete";

import "./OrderTable.css";

const OrderTable = () => {
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
    feedbackId
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
    });
    setIsOpen(true);
  };

  const revisonCompletedOnClickListner = async (
    tutorId,
    tuteeId,
    gigId,
    feedbackId
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
    });

    setIsOpenConfirmRevisionComplete(true);
  };

  const completeOrderOnClickListner = async (
    tutorId,
    tuteeId,
    gigId,
    feedbackId
  ) => {
    await setRevisionData({
      tutorId: tutorId,
      tuteeId: tuteeId,
      gigId: gigId,
      feedbackId: feedbackId,
    });

    setIsOpenConfirmOrderComplete(true);
  };

  return (
    <div className="order_table_container">
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
          isTeacher={true}
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
        <table className="order_table">
          <thead>
            <th>
              <span className="gig_thead_th-1">BUYER</span>
            </th>
            <th>
              <span className="gig_thead_th-2">GIG</span>
            </th>
            <th className="gig_thead_th-3">Status</th>
            <th className="gig_thead_th-3">Revision</th>
            <th className="gig_thead_th-3">Action</th>
            {/* <th className="due-head">DUE ON</th> */}
            <th className="total-head">TOTAL</th>
            {/* <th className="status-head">STATUS</th> */}
          </thead>

          <tbody>
            {orders?.gigBuyers?.map((order) => {
              return (
                <tr>
                  <td className="order_table_avatar_wrapper">
                    {/* <div className="order_table_student_avatar">
                        <img width={30} height={30} src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                      </div> */}
                    <img
                      className="student_img"
                      width={30}
                      src={order?.student_id?.profileImage}
                      alt=""
                    />
                    <Link to={"/profile/" + order?.student_id?._id}>
                      <div className="order_table_student_name">
                        {order?.student_id?.username}
                      </div>
                    </Link>
                  </td>
                  <td className="order_table_gig_title">
                    <Link to={"/tutor-gig/" + order?.gig_id?._id}>
                      <div className="gig_title">
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
                          feedback?.tutorId === appUser?._id &&
                          feedback?.tuteeId === order?.student_id?._id
                        ) {
                          return (
                            <span className="order_table_action_btn">
                              {feedback.status[0].toUpperCase() +
                                feedback.status.slice(1)}
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
                          feedback?.tutorId === appUser?._id &&
                          feedback?.tuteeId === order?.student_id?._id
                        ) {
                          return (
                            <span className="order_table_action_btn">
                              {feedback?.revisionMessage || "NA"}
                            </span>
                          );
                        }
                      })}
                    {/*   gig : {order?._id} <br />
                  student : {order?.student_id?._id} <br />
                  teacher : {appUser?._id} <br /> */}
                  </td>

                  <td className="order_table_actions">
                    {feedbacks &&
                      feedbacks.length > 0 &&
                      feedbacks.map((feedback) => {
                        if (
                          feedback?.gigId === order?.gig_id?._id &&
                          feedback?.tutorId === appUser?._id &&
                          feedback?.tuteeId === order?.student_id?._id
                        ) {
                          if (feedback.status === "in progress")
                            return (
                              <>
                                {/*   <button className="order_table_action_btn" onClick={() => requestRevisonOnClickListner(feedback?._id)}>
                              Request Revision 
                            </button> <br /> */}{" "}
                                {/* onlcick mark status="under revision" */}
                                <button
                                  disabled={feedback.tutorSideCompleted}
                                  className="order_table_action_btn"
                                  onClick={() =>
                                    completeOrderOnClickListner(
                                      feedback?.tutorId?._id,
                                      feedback?.tuteeId?._id,
                                      feedback?.gigId?._id,
                                      feedback?._id
                                    )
                                  }
                                >
                                  {feedback.tutorSideCompleted
                                    ? "You mark completed"
                                    : "Complete Order"}{" "}
                                  {/* onlcick mark status="completed" */}
                                </button>
                              </>
                            );
                          else if (feedback.status === "under revision")
                            return (
                              <>
                                <button
                                  className="order_table_action_btn"
                                  onClick={() =>
                                    revisonCompletedOnClickListner(
                                      feedback?.tutorId?._id,
                                      feedback?.tuteeId?._id,
                                      feedback?.gigId?._id,
                                      feedback?._id
                                    )
                                  }
                                >
                                  Mark Revision Completed{" "}
                                  {/* onlcick mark status="in progress" */}
                                </button>
                              </>
                            );

                          if (feedback.status === "completed")
                            return (
                              <Link
                                to={"/user/teacher/feedback/" + feedback?._id}
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
  );
};

export default OrderTable;
