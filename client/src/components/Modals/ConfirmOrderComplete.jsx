import axios from 'axios';
import React, { useState } from 'react'
import { backendURL } from '../../data/vars';
import styles from "./AskForRevisionModal.module.css";

const ConfirmOrderComplete = ({ isTeacher, setRevisionData, setIsOpenConfirmOrderComplete, refreshData, setRefreshData, revisionData: { feedbackUID, tutorId, tuteeId, gigId, feedbackId } }) => {
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState(!isTeacher ? "/api/feedback/complete-order/" : "/api/feedback/teacher-complete-order/");
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpenConfirmOrderComplete(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Request For Order Completion</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpenConfirmOrderComplete(false)}>
            <div style={{ marginBottom: "-3px" }} >X</div>
          </button>
          <div className={styles.modalContent}>
            <div>
              Are you sure you want to confirm this order as complete?
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => {
                axios.post(backendURL + url, {
                  tutorId: tutorId,
                  tuteeId: tuteeId,
                  gigId: gigId,
                  feedbackId: feedbackId,
                }).then((res) => {
                  setIsOpenConfirmOrderComplete(false);
                  console.log(res.data);
                  setRefreshData(!refreshData);
                  // alert(res.data.message);
                })
                  .catch((err) => {
                    console.log(err);
                  }).finally(() => {
                    setRevisionData({});
                  });
              }
              }>
                Do request
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setIsOpenConfirmOrderComplete(false)
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
  )
}

export default ConfirmOrderComplete