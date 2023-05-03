const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");
const UserProfile = require("../models/UserProfile.model");


const findGigsByKeyword = async (req, res) => {
    const { keyword } = req.params;

    var userMap = {};
    let users = [];
    let gigs = [];

    await UserGig.find(
        { "keywords": { "$regex": keyword, "$options": "i" } },
    ).then(async (filterGigs) => {
        gigs = filterGigs;
        users = await UserProfile.find({}).populate('profileDetails');
        // const userMap = {};
        users.forEach((user) => {
            filterGigs.map(gig => {
                if (gig.userId === user.userId) {
                    userMap[user.userId] = user;
                }
            })
        });
    })
        .then(() => {
            res.status(200).send({ status: "success", users: userMap, gigs: gigs })
        })
        .catch(err => {
            console.error(err);
        })



    // convert to map to remove duplicates


}

module.exports = findGigsByKeyword;