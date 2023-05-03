const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");
const UserProfile = require("../models/UserProfile.model");

const search = async (req, res) => {
    const { q } = req.query;

    if (!q) return res.status(500).send({ status: "failed", message: "Query required to filter!" });

    const user = await User.find({
        $or: [
            { "username": { "$regex": q, "$options": "i" } },
            { "email": { "$regex": q, "$options": "i" } },
        ]
    }).populate('profileDetails');

    const profile = await UserProfile.find({
        $or: [
            { "fname": { "$regex": q, "$options": "i" } },
            { "lname": { "$regex": q, "$options": "i" } },
            { "status": { "$regex": q, "$options": "i" } },
        ]
    });

    const gig = await UserGig.find({
        $or: [
            { "keywords": { "$regex": q, "$options": "i" } },
            { "category": { "$regex": q, "$options": "i" } },
        ]
    });

    var userMap = {};
    var profileMap = {};
    let users = await UserProfile.find({});

    // await profile.forEach(async profile => {
    //     users.map(user => {
    //         if (user.userId === profile.userId) {
    //             userMap[profile.userId] = user;
    //         }
    //     })
    // });

    await users.forEach((user) => {
        gig.map(gig => {
            if (gig.userId === user.userId) {
                userMap[user.userId] = user;
            }
        })
    })

    res.status(200).send({ status: "sucess", gig, gigUsers: userMap, profile, user });
}

module.exports = search;