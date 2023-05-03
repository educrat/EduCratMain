const mongoose = require("mongoose");
const Feedback = require("./feedback.model");
const UserGig = require("./UserGig.model");
const UserProfile = require("./UserProfile.model");
const { v4: uuidv4 } = require("uuid");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profileDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserProfile,
    },
    profileImage: {
      // default: "https://cdn1.iconfinder.com/data/icons/ui-essential-17/32/UI_Essential_Outline_1_essential-app-ui-avatar-profile-user-account-512.png",
      type: String,
    },
    gigsInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserGig,
      },
    ],
    // token: [String],
    token: {
      type: String,
      default: null,
    },
    role: {
      type: Number,
      enum: [0, 1, 2], // 0 => DefaultUser (Tutee)  &  1 => Tutors  & 2=>admin
      default: 0,
    },

    // gig bought is for students :=> to know which gig has be bought
    gigBuyed: [
      {
        tutor_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        gig_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserGig",
          require: true,
        },
        gigPrice: {
          type: Number,
          require: true,
        },
        razorpay_order_id: {
          type: String,
          require: true,
        },
      },
    ],

    // gigBuyers is for teachers :=> to know who bought their gigs
    gigBuyers: [
      {
        student_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        gig_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserGig",
          require: true,
        },
        gigPrice: {
          type: Number,
          require: true,
        },
        razorpay_order_id: {
          type: String,
          require: true,
        },
      },
    ],

    feedbackInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Feedback,
      },
    ],

    /*   Feedbacks: [
      {
        uid: {
          type: String,
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
    ], */

    otp: {
      type: String,
      default: null,
      // expires: '86400'  // 24 * 3600sec => 24 hours => 1 day
    },
    otpTimeStamp: {
      type: Date,
      default: null,
      // expires: '86400'
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
