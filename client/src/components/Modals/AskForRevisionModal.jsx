import axios from "axios";
import React, { useState } from "react";
import { backendURL } from "../../data/vars";
import styles from "./AskForRevisionModal.module.css";

const AskForRevisionModal = ({
  setRevisionData,
  setIsOpen,
  refreshData,
  setRefreshData,
  revisionData: { feedbackUID, tutorId, tuteeId, gigId, feedbackId },
}) => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Request For Revision</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <div style={{ marginBottom: "-3px" }}>X</div>
          </button>
          <div className={styles.modalContent}>
            <div>
              <input
                type="text"
                value={message}
                maxlength="20"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your revison message"
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  if (message.length > 3) {
                    axios
                      .post(backendURL + "/api/feedback/request-revison/", {
                        tutorId: tutorId,
                        tuteeId: tuteeId,
                        gigId: gigId,
                        feedbackId: feedbackId,
                        revisionMessage: message,
                        feedbackUID: feedbackUID,
                      })
                      .then((res) => {
                        setIsOpen(false);
                        console.log(res.data);
                        setRefreshData(!refreshData);
                        // alert(res.data.message);
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                      .finally(() => {
                        setRevisionData({});
                      });
                  } else {
                    alert("Please enter a message with more than 3 characters");
                  }
                }}
              >
                Do request
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setIsOpen(false);
                  setMessage("");
                }}
              >
                Cancel request
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskForRevisionModal;
