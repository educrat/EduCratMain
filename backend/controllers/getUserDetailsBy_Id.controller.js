const User = require("../models/User.model");

const getUserDetailsBy_Id = async (req, res) => {
    const user = await User.findById(req.params._id).populate("profileDetails");
    console.log(">> user : ", user);
    if (user) return res.status(200).send({ status: "sucess", user: user })
    else res.status(500).send({ status: "failed", message: "User not found!" });
}

module.exports = getUserDetailsBy_Id