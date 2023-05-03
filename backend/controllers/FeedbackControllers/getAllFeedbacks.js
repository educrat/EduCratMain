const Feedback = require("../../models/feedback.model");

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("tutorId").populate('tuteeId.profileDetails').populate("tuteeId").populate("gigId");
        res.status(200).send({status: "success", feedbacks});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "Failed", message : error});
    }
}

module.exports = getAllFeedbacks;