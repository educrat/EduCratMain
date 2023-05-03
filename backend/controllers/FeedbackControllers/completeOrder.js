const Feedback = require("../../models/feedback.model");
const User = require("../../models/User.model");

const completeOrder = async (req, res) => {
    try {
        const { tutorId, tuteeId, gigId, feedbackId,feedbackUID  } = req.body; // NOTE: all are *_id* of the document


        console.log(feedbackId, feedbackUID);

        const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
            $set: {
                status: "completed",
                revisionMessage: "",
                tutorSideCompleted: true
            }
        }, { new: true });

        console.log(">>> feedback : ", feedback);

        return res.status(200).json({ status: "success", message: "Revision completed successfully" });


        User.findOneAndUpdate({ _id: tuteeId, "feedbacks._id": feedbackId }, {
            $set: {
                "feedbacks.$.status": "completed",
            }
        }, { new: true }).then((user) => {
            if (user) {
                console.log("tutee updated user : ", user);

                User.findOneAndUpdate({ _id: tutorId, "feedbacks.uid": feedbackUID }, {
                    $set: {
                        "feedbacks.$.status": "completed",
                    }
                }, { new: true }).then((user) => {
                    if (user) {
                        console.log("tutor updated user : ", user);
                        return res.status(200).json({ status: "success", message: "Order completed" });
                    }
                }).catch((err) => {
                    console.log("error : ", err);
                });

                // return res.status(200).json({ status: "success", message: "Order completed partially!" });
            }
        }).catch((err) => {
            console.log("error : ", err);
        });

    } catch (error) {
        res.status(500).send({ status: "failed", message: error });
    }
}

module.exports = completeOrder;