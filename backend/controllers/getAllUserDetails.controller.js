const User = require("../models/User.model");
const UserProfile = require("../models/UserProfile.model");

const getAllUserDetails = async (req, res) => {
    const userId = req.params.userId;

    const user = await User.findOne({ userId: userId }).populate("feedbackInfo");
    const profile = await UserProfile.findOne({ userId: userId });

    res.status(200).send({ status: "sucess", user: user, profile: profile });
}

module.exports = getAllUserDetails; 