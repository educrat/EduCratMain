const Feedback = require("../../models/feedback.model");
const User = require("../../models/User.model");

const getFeedback = async (req, res) => {
    try {
        const { feedbackId} = req.params;
        // console.log(feedbackId, feedbackUID);

        const feedback = await Feedback.findById(feedbackId);

        console.log(">>> feedback : ", feedback);

        return res.status(200).json({ status: "success", feedback: feedback});

    } catch (error) {
        res.status(500).send({ status: "failed", message: error });
    }
}

module.exports = getFeedback;