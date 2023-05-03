const User = require('../models/User.model.js');

const getUserDetails = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId).populate("profileDetails").populate('gigsInfo').populate('feedbackInfo');
        console.log(">> user : ", user);
        if (user) return res.status(200).send({ status: "sucess", user: user })
        else res.status(500).send({ status: "failed", message: "User not found!" });

    } catch (error) { 
        res.status(500).send({ status: "failed", message: "User not found!", error: error });
    }
} 

module.exports = getUserDetails;