const Feedback = require("../../models/feedback.model");
const Payment = require("../../models/paymentModel");
const User = require("../../models/User.model");

const requestRevision = async (req, res) => {
    try {
        const { feedbackUID, tutorId, tuteeId, gigId, revisionMessage, feedbackId } = req.body; // NOTE: all are *_id* of the document

        // User.findOneAndUpdate({ _id: tuteeId, "feedbacks._id": feedbackId }, {
        //     $set: {
        //         "feedbacks.$.status": "under revision",
        //         "feedbacks.$.revisionMessage": revisionMessage,
        //     }
        // }, { new: true }).then((user) => {
        //     if (user) {
        //         console.log(">>> tutee updated user : ", user);
        //         console.log("-------------------------");
        //         console.log("-------------------------");

        //         console.log(tutorId, tuteeId, gigId, revisionMessage, feedbackId, feedbackUID);

        //         User.findOneAndUpdate({ _id: tutorId, "feedbacks.uid": feedbackUID }, {
        //             $set: {
        //                 "feedbacks.$.status": "under revision",
        //                 "feedbacks.$.revisionMessage": revisionMessage,
        //             }
        //         }, { new: true }).then((user) => {
        //             if (user) {
        //                 console.log(">>> tutor updated user : ", user);
        //                 console.log(tutorId, tuteeId, gigId, revisionMessage, feedbackId, feedbackUID);
        //                 return res.status(200).json({ status: "success", message: "Request for revision done successfully" });
        //             }
        //         }).catch((err) => {
        //             console.log("error : ", err);
        //         });

        //         // return res.status(200).json({ status: "success", message: "Request for revision done partially" });
        //     }
        // }).catch((err) => {
        //     console.log("error : ", err);
        // });

        console.log(feedbackId, feedbackUID);

        const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
            $set: {
                status: "under revision",
                revisionMessage: revisionMessage,
                tutorSideCompleted: false
            }
        }, { new: true });

        console.log(">>> feedback : ", feedback);

        return res.status(200).json({ status: "success", message: "Request for revision done successfully" });


    } catch (error) {
        res.status(500).send({ status: "failed", message: error });
    }
}

module.exports = requestRevision;