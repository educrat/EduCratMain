const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");
const UserProfile = require("../models/UserProfile.model");

const getUserGig = async (req, res) => {

    try {
        const gig = await UserGig.findById(req.params.gigId)

        if (!gig) return res.status(500).send({ status: "failed", message: "Gig not found!" })

        const user = await User.findOne({ userId: gig.userId });
        const profile = await UserProfile.findOne({ userId: gig.userId });

        return res.status(200).send({ status: "sucess", gig: gig, user: user, profile: profile })
    } catch (error) {
        res.status(500).send({ status: "failed", message: error.message })
    }


}

module.exports = getUserGig;