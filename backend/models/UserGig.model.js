const mongoose = require('mongoose');
const User = require('./User.model.js');

const userGigSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
        default: ""
    },
    title: {
        type: String,
        require: true,
        default: ""
    },
    subtitle: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        require: true,
        default: ""
    },
    level: {
        type: String,
        require: true,
    },
    language: {
        type: String,
        require: true
    },
    category: [{
        type: String,
    }],
    images: [
        { type: String }
    ],
    learnings: [
        { type: String }
    ],
    toWhom: [
        { type: String }
    ],
    prerequisites: [
        { type: String }
    ],
    reviews: [
        {
            userId: {
                type: String,
                require: true
            },
            review: {
                type: String,
            },
            rating: {
                type: String,
            },
            publishedOn: {
                type: Date,
                default: Date.now
            }
        }
    ],
    keywords: [
        { type: String }
    ],
    pricing: {
        currentPrice: Number,
        discount: Number,
        actualPrice: Number
    },

}, { timestamps: true });

const UserGig = mongoose.model('UserGig', userGigSchema);

module.exports = UserGig