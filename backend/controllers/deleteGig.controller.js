const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");

const deleteGig = async (req, res) => {

    const { user_id, gig_id } = req.body;

    if (!user_id || !gig_id) {
        return res.status(500).json({ status: "failed", message: "user_id or gig_id not provided" });
    }

    let gigPresent = false;

    try {

        const gig = await UserGig.findById(gig_id);
        console.log(gig);
        if (!gig) {
            return res.status(500).json({ status: "failed", message: "gig not found" });
        } else {

            const user = await User.findById(user_id);
            if (!user) {
                return res.status(500).send({ status: "failed", message: "User not found!" });
            }
            // await userGigs.gigsInfo.map(async curGig => {
            //     if (curGig._id === gig_id) { 
            //         gigPresent = true;
            await User.updateMany({ _id: user_id }, { $pull: { gigInfo: gig_id } }, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: "failed", message: "something went wrong while deleting gig from user" });
                } 
                return res.status(200).json({ status: "success", message: "gig deleted" });
            }).clone();
            //     }
            // })

            // console.log("gigPresent : " + gigPresent);

            // if (!gigPresent) {
            //     return res.status(500).json({ status: "failed", message: "gig not found for this user" });
            // }

        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error.message });
    }
}

module.exports = deleteGig;