const User = require('../models/User.model');

const checkIsUserExists = async (req, res, next) => {
    const { email } = req.body;

    if (!email) return res.status(500).send({ status: "failed", message: "Email required!" })

    await User.findOne({ email: email }).then((user) => {
        if (!user) return res.status(500).send({ status: "failed", message: "User not found!" })

        console.log(user);

        res.locals.user = user;
        next();

    }).catch(err => res.status(500).send({ status: "failed", message: err.message }))
}

module.exports = checkIsUserExists;