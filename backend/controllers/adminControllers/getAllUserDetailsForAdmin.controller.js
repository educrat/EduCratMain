const User = require("../../models/User.model");

const getAllUserDetailsForAdmin = async (req, res) => {
    try {
        const users = await User.find({ role: { $nin: 2 } })
            .populate('profileDetails')
            .populate('gigsInfo')
            .populate('gigBuyed.tutor_id').populate('gigBuyed.gig_id')
            .populate('gigBuyers.student_id').populate('gigBuyers.gig_id')
            .populate('gigBuyed.tutor_id.profileDetails')
            .populate('gigBuyers.student_id.profileDetails')


        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'failed', message: err });
    }
};

module.exports = getAllUserDetailsForAdmin;