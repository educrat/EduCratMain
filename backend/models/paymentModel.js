const mongoose = require("mongoose");
const User = require("./User.model");
const UserGig = require("./UserGig.model");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
  // gigId: {
  //   type: String,
  //   required: true,
  // },

  // by mistake i stored the user_id as tutor_id and tutor_id as user_id
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserGig,
  },
  tutor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  txn_amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;