const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const updatePassword = async (req, res) => {
    const { userId, password, cpassword } = req.body;
    if (!userId || !password || !cpassword) {
        return res.status(500).send({ status: "failed", message: "userId, password, confirm-password is required!" });
    }

    await User.findOneAndUpdate({ userId: userId }, {
        password: bcrypt.hashSync(password, 8)
    }).then((user) => {
        if(!user){
            return res.status(500).send({status: "failed", message: "User not found with this userId"})
        }
        res.status(200).send({status: "sucess", message: "Password changes sucessfully!"})
    }).catch(err => {
        res.status(500).send({status: "failed", message: err.message})
    })

}

module.exports = updatePassword;