import axios from 'axios';
import React, { useState } from 'react'
import { backendURL } from '../../data/vars';
import styles from "./AskForRevisionModal.module.css";

const ConfirmRevisionComplete = ({ setRevisionData, setIsOpenConfirmRevisionComplete, refreshData, setRefreshData, revisionData: { feedbackUID, tutorId, tuteeId, gigId, feedbackId } }) => {
    const [message, setMessage] = useState('');
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpenConfirmRevisionComplete(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Request For Revision Completion</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpenConfirmRevisionComplete(false)}>
                        <div style={{ marginBottom: "-3px" }} >X</div>
                    </button>
                    <div className={styles.modalContent}>
                        <div>
                            Are you sure you want to confirm this revision as complete?
                        </div>
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={() => {
                                // alert("HERE")
                                axios.post(backendURL + "/api/feedback/complete-revision/", {
                                    tutorId: tutorId,
                                    tuteeId: tuteeId,
                                    gigId: gigId,
                                    feedbackId: feedbackId,
                                }).then((res) => {
                                    setIsOpenConfirmRevisionComplete(false);
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
                                Mark Complete
                            </button>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => {
                                    setIsOpenConfirmRevisionComplete(false)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmRevisionComplete