const User = require("../models/User.model");

const validateToken = (req, res) => {
    try {
        User.findOne({ token: req.params.token }).populate('profileDetails').then((user) => {
            if (user) {
                res.status(200).send({ status: "sucess", user: user });
            } else {
                res.status(500).send({
                    status: "failed",
                    message: "Login again! Token is not valid!",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", messsage: error.message });
    }
}

module.exports = validateToken;