const User = require("../models/User.model");

const verifyUser = (req, res) => {
    const otp = req.params.otp;
    const username = req.params.username;

    try {
        User.findOne({
            username: username,
        }).exec(async (err, user) => {
            if (err) {
                console.log(err);
                res.status({ status: "failed", message: err.message });
                return;
            }
            if (user) {
                if (user.otp && user.otp === otp) {
                    await User.findByIdAndUpdate(
                        { _id: user._id },
                        {
                            verified: true,
                        }
                    )
                        .then((verifiedUser) => {
                            res
                                .status(200)
                                .send({ status: "sucess", message: "Verified Succesfully!" });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                status: "failed",
                                message: "Verification not done!",
                                err: err,
                            });
                        });
                } else {
                    res.status({ status: "failed", message: "OTP is not valid" });
                    console.log({ status: "failed", message: "OTP is not valid" });
                }
            } else {
                console.log(user, otp, username);
                res
                    .status(500)
                    .send({ status: "failed", message: "USER is not valid" });
            }
        });
    } catch (err) {
        console.log(err);
        res.send({ status: "failed", message: err.message });
    }
}

module.exports = verifyUser;