const UserGig = require("../models/UserGig.model");
const UserProfile = require("../models/UserProfile.model");

const findGigByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        var userMap = {};
        let users = [];
        let gigs = [];

        await UserGig.find(
            { "category": { "$regex": category, "$options": "i" } },
        ).then(async (filterGigs) => {
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
    } catch (error) {
        res.status(500).send({ status: "failed", message: error.message });
    }
}

module.exports = findGigByCategory;