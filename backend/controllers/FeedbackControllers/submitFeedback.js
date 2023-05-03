const Feedback = require("../../models/feedback.model");
const User = require("../../models/User.model");

const submitFeedback = async (req, res) => {
    try {
        const {usertype, feedbackId} = req.params;
        const {feedback, rating} = req.body;
        // console.log(feedbackId, feedbackUID);

        let setData = {};

        if(usertype==="student"){
            setData = {
                studentFeedback: feedback,
                studentRating: rating,
            }
        }else{
            setData = {
                teacherFeedback: feedback,
                teacherRating: rating,
            }
        }

        const feedbackNew = await Feedback.findByIdAndUpdate(feedbackId, {
            $set: setData
        }, { new: true });

        console.log(">>> feedback : ", feedback);

        return res.status(200).json({ status: "success", feedback: feedbackNew,  message: "Feedback added!" });


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

module.exports = submitFeedback;