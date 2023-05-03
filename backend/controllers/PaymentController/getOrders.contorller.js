const Payment = require("../../models/paymentModel");
const User = require("../../models/User.model");

const getOrders = async (req, res) => {
    try {
        // const orders = await Payment.find({ tutor_id: req.params.tutorId }).populate('gigId').populate('tutor_id').populate('user_id')
        // NOTE: here tutorId is = user logged in device => tutorId = tuteeId = user._id

        const gigBuyers = await User.findOne({ _id: req.params.tutorId })
            .populate('gigBuyers.gig_id').populate('gigBuyers.student_id')
            .populate('gigBuyed.gig_id').populate('gigBuyed.tutor_id')
            .populate('feedbackInfo')
            // .populate('feedbacks.gigId').populate('feedbacks.tuteeId').populate('feedbacks.tutorId');

        // const feedbacksOfTutor = await User.findOne({ tutorId: req.params.tutorId });
        // const feedbacksOfTutee = await User.findOne({ tuteeId: req.params.tuteeId });

        res.status(200).json({ gigBuyers, /* feedbacksOfTutor, feedbacksOfTutee */ });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = getOrders;