const mongoose = require("mongoose");
const User = require("./User.model");
const UserGig = require("./UserGig.model");
const { v4: uuidv4 } = require('uuid');

const getUUId = async () => {
    return await uuidv4()
}

const FeedbackSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            require: true,
            default: getUUId(),
        },
        revisionMessage: {
            type: String,
            default: ""
        },
        tutorSideCompleted: {
            type: Boolean,
            default: false,
        },
        gigId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserGig",
        },
        tutorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        tuteeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        teacherFeedback: {
            type: String
        },
        studentFeedback: {
            type: String
        },
        teacherRating: {
            type: Number,
            default: 0,
        },
        studentRating: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["in progress", "under revision", "completed"],
            default: "in progress",
        }
    }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback