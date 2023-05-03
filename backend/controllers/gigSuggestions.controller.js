const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");
const UserProfile = require("../models/UserProfile.model");

const gigSuggestions = async (req, res) => {
    var userMap = {};
    let users = [];
    let gigs = [];

    await UserGig.find()
        .sort('-updatedAt')
        .limit(10)
        .then(async (filterGigs) => {
            gigs = filterGigs;

            users = await UserProfile.find({});

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
}

module.exports = gigSuggestions;