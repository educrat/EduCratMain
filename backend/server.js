const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const envVARS = require("dotenv");
const connDB = require("./config/db.config");
const { default: mongoose } = require("mongoose");
const sendMailToUser = require("./helpers/sendMailToUsers");
const nodemailer = require("nodemailer");
const User = require("./models/User.model.js");
var bodyParser = require("body-parser");
const { Server } = require('socket.io');
const http = require('http');
const chatRouter = require('./routes/chat.routes');
const messagesRouter = require('./routes/messages.router.js')
const Razorpay = require('razorpay');
const paymentRoute = require('./routes/payment.routes.js');
const crypto = require('crypto');
const Payment = require("./models/paymentModel");
const ChatModel = require("./models/chatModel");
const getOrders = require("./controllers/PaymentController/getOrders.contorller");
const Feedback = require("./models/feedback.model");
const { v4: uuidv4 } = require('uuid');

envVARS.config();

const PORT = process.env.PORT || 8080;

const app = express();

var corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

// parse application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());

app.use(
  cookieSession({
    name: "educrat-session",
    secret: process.env.SECRET, // should use as secret environment variable
    httpOnly: true,
  })
);

//console.log(process.env.RAZORPAY_KEY_ID);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//console.log(instance);

module.exports = instance;

// app.use("/api", paymentRoute);

app.post('/api/checkout', async (req, res) => {

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  //console.log(options);

  try {
    const order = await instance.orders.create(
      {
        amount: Number(req.body.amount * 100),
        currency: "INR",
      }
    );
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.error,
    });
  }

})

app.get("/api/orders/tutor/:tutorId", getOrders);
app.get("/api/orders/tutor/:tutorId/:tuteeId", getOrders);

app.post('/api/paymentverification', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { user_id, gigId, tutor_id, gigPrice } = req.query; // user_id => tutee & _id => tutor_id

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    console.log(expectedSignature, razorpay_signature);


    if (isAuthentic) {
      // Database comes here

      const isChatAlreadyPresent = await ChatModel.findOne({
        members: { $all: [user_id, tutor_id] }
      })

      if (!isChatAlreadyPresent) {
        const newChat = new ChatModel({
          members: [user_id, tutor_id],
        });

        try {
          const result = await newChat.save();
          // res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      }

      const feedbackNew =  await new Feedback({
        gigId: gigId,
        tutorId: tutor_id,
        tuteeId: user_id,
        teacherFeedback: "",
        studentFeedback: "",
        uid: await uuidv4(),
      });

      feedbackNew.save(async (err, newFeedback) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({
              status: "failed",
              message: "Feedback is not created with new gig",
            });
        }

        console.log("new feedback added : ", newFeedback);

        const updatedTeacher = await User.findOneAndUpdate(
          { _id: tutor_id },
          {
            $push: {
              gigBuyers: {
                student_id: user_id,
                gig_id: gigId,
                gigPrice: gigPrice,
                razorpay_order_id: razorpay_order_id
              },
              feedbackInfo: newFeedback,
              /* feedbacks: {
                gigId: gigId,
                tutorId: tutor_id,
                tuteeId: user_id,
                teacherFeedback: "",
                studentFeedback: "",
                uid: uuid,
              }, */
            }
          },
          { new: true }
        );
        console.log("Updated Teacher : " + updatedTeacher._id)


        const updatedStudent = await User.findOneAndUpdate(
          { _id: user_id },
          {
            $push: {
              gigBuyed: {
                tutor_id: tutor_id,
                gig_id: gigId,
                gigPrice: gigPrice,
                razorpay_order_id: razorpay_order_id
              },
              feedbackInfo: newFeedback,
            /*   feedbacks: {
                gigId: gigId,
                tutorId: tutor_id,
                tuteeId: user_id,
                teacherFeedback: "",
                studentFeedback: "",
                uid: uuid,
              }, */
            },

          },
          { new: true }
        );
        console.log("Updated Student : " + updatedStudent._id);

      });


      const paymentCreated = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        user_id,
        tutor_id,
        gigId,
        txn_amount: gigPrice,
        // userId: 
      });

      console.log("Payment Created : " + paymentCreated);


      res.redirect(
        // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        `http://localhost:3000/inbox?_id=${tutor_id}`,
      );

    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log("Error in paymentverifivation : " + error);
  }
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);

app.get("/api/getsecret", (req, res) =>
  res.status(200).json({ secret: process.env.RAZORPAY_KEY_SECRET })
);

app.get("/api/getkeysecret", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID, secret: process.env.RAZORPAY_KEY_SECRET })
);



app.post("/send_email", function (req, response) {
  var from = "Educrat 📧 <arcinvoicetool@gmail.com";
  var to = req.body.to;
  var subject = "testing EMail is sending or not";
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arcinvoicetool@gmail.com",
      pass: "nmgnfhtvufddgees",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
    response.redirect("/");
  });
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

// get new accessToeken through postman by clicing on "get new access token" button 
// then replce the access token in the below code
const accessToken = process.env.ACCESS_TOKEN;

app.post('/api/meeting/url', (req, res) => {
  try {
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://api.zoom.us/v2/users/me/meetings',
      'headers': {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        // 'Cookie': 'TS018dd1ba=0169649699b5d3fa8b13932715953289e6dbade5f57291f8135c1d382b14dc9e078a977c70d3e155be33c59c049d46e80b98cc15b2; _zm_chtaid=961; _zm_ctaid=HKpSOHz6QKCkpOMD7m144Q.1663344737067.932e2809e55d4ee69aabe643aadb8402; _zm_mtk_guid=7ff7c4af1c5549feb23fdcd790459a78; _zm_page_auth=us04_c_KdvMXG1fSYS97Q2iw-DNUw; _zm_ssid=us04_c_0lgz22SFT7OfvDcZMP_cBQ; _zm_visitor_guid=7ff7c4af1c5549feb23fdcd790459a78; TS01f92dc5=011114b6ad56f287b83966c006571a32f169e15b249bd05d405202d1d6879c8e52f3cbd14fa88a27fceb6b0087bae1cd1d9c4cbb8f; cred=0AB401A6A87ADD46419D75B6C24FC13F'
      },
      body: JSON.stringify({
        "topic": "test create meeting",
        "type": 1,
        "settings": {
          "host_video": "true",
          "participant_video": "true"
        }
      })

    };

    request(options, function (error, response) {
      if (error) return res.status(500).send({ status: "Failed", message: err.message });
      console.log(">>>" + response.body);
      return res.status(200).send(response.body);
    });
  } catch (err) {
    res.status(500).send({ status: "Failed", message: err.message })
  }
})

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
app.use('/api/chat', chatRouter);
app.use('/api/message', messagesRouter);

app.listen(PORT, function () {
  console.log("Server listening at http://localhost:" + PORT);
  connDB();
});