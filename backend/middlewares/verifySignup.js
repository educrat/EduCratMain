const User = require("../models/User.model");


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { username, email, password } = req.body;

    console.log(email, username, password);

    if (!username || !email || !password) {
        res.status(500).send({ status: 'failed', message: "username, password, email required!" })
    }

    const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

    console.log("🚀 ~ file: verifySignup.js ~ line 69 ~ checkDuplicateUsernameOrEmail ~ user̥", user)

    if (user) {
        if (user.username === username) {
            res.status(400).send({ status: 'failed', message: "Failed! Username is already in use!" });
            return;
        }
        if (user.email === email) {
            res.status(400).send({ status: 'failed', message: "Failed! Email is already in use!" });
            return;
        }

        console.log(" >> New user ̥is coming...");
        next();
    } else {
        console.log("New user is coming...");
        next();
    }
}

module.exports = checkDuplicateUsernameOrEmail; 