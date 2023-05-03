const mongoose = require('mongoose');
const User = require('./User.model');

const userProfileSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    profileURL: {
        default: "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-512.png",
        type: String
    },
    country: {
        type: String,
        default: ""
    },
    languages: {
        type: Array,
        default: []
    },
    occupation: {
        type: String
    },
    skills: {
        type: Array,
        default: []
    },
    education: {
        type: Array,
        default: []
    },
    certification: {
        type: Array,
        default: []
    },
    storyLine: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    memberSince: {
        type: String,
        default: new Date().getFullYear()
    },
    availabile: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    linkedAccounts: {
        facebook: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        }
    }
})

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;