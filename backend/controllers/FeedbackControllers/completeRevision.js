
const Feedback = require("../../models/feedback.model");
const User = require("../../models/User.model");

const completeRevision = async (req, res) => {
    try {
        const { tutorId, tuteeId, gigId, feedbackId, feedbackUID } = req.body; // NOTE: all are *_id* of the document

        console.log(feedbackId, feedbackUID);

        const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
            $set: {
                status: "in progress",
                revisionMessage: "",
                tutorSideCompleted: false
            }
        }, { new: true });

        console.log(">>> feedback : ", feedback);

        return res.status(200).json({ status: "success", message: "Revision completed successfully" });


        await User.findOneAndUpdate({ _id: tutorId, "feedbacks.gigId": gigId, "feedbacks.tutorId": tutorId, "feedbacks.tuteeId": tuteeId }, {
            $set: {
                "feedbacks.$.status": "in progress",
                "feedbacks.$.revisionMessage": "",
            }
        }, { new: true }).then(async (user) => {
            if (user) {
                console.log("tutee updated user : ", user._id);
                console.log(user.username);

                await User.findOneAndUpdate({ _id: tuteeId, "feedbacks._id": feedbackId }, {
                    $set: {
                        "feedbacks.$.status": "in progress",
                        "feedbacks.$.revisionMessage": "",
                    }
                }, { new: true }).then((user2) => {
                    if (user2) {
                        console.log("tutor updated user : ", user2._id);
                        console.log(user2.username);

                        return res.status(200).json({ status: "success", message: "Revision completed successfully" });
                    }
                }).catch((err) => {
                    console.log("error : ", err);
                });

                // return res.status(200).json({ status: "success", message: "Revision completed partially" });
            }
        }).catch((err) => {
            console.log("error : ", err);
        });


        // User.updateMany({ "feedbacks.uid": feedbackUID }, {
        //     $set: {
        //         "feedbacks.$.status": "in progress",
        //         "feedbacks.$.revisionMessage": "",
        //     }
        // }, { new: true }).then((user) => {
        //     if (user) {
        //         console.log("tutee updated");
        //         console.log(user.username);
        //     }
        // }).catch((err) => {
        //     console.log("error : ", err);
        // });

        // const updated = await User.updateMany({ "feedbacks.uid": feedbackUID },
        //     {
        //         $set: {
        //             "feedbacks.$.status": "in progress",
        //             "feedbacks.$.revisionMessage": "",
        //         }
        //     });

        // console.log(updated);
        // return res.status(200).json({ status: "success", message: "Revision completed successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", message: error });
    }
}

module.exports = completeRevision;