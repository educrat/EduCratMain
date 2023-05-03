var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const UserProfile = require("../models/UserProfile.model");
const { v4: uuidv4 } = require("uuid");
const sendMailToUser = require("../helpers/sendMailToUsers");
const otpStringGenerator = require("../helpers/otpStringGenerator");
const UserGig = require("../models/UserGig.model");

// for default user
exports.signup = async (req, res) => {
  const { username, email, password, fname, lname, role } = req.body;

  console.log(username, email, password, fname, lname);

  const uuid = await uuidv4();
  const otp = await otpStringGenerator(10);

  try {
    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      userId: uuid,
      otp: otp,
      otpTimeStamp: new Date(),
      gigsInfo: [],
      role: role,
    });

    user.save(async (err, user) => {
      console.log(user);
      if (err) {
        console.log("line 30 signup " + err);
        res.status(500).send({ status: "failed", message: err });
        return;
      }

      console.log(user);

      const userProfile = await new UserProfile({
        userId: uuid,
        fname: fname,
        lname: lname,
      });

      await userProfile.save((err, profile) => {
        if (err) {
          console.log("Error while creating profile " + err);
          return res.status(500).send({ status: "failed", message: err });
        }

        console.log("Profile created successfully! => " + profile);

        User.findByIdAndUpdate(
          { _id: user._id },
          {
            profileDetails: profile,
          }
        )
          .then((user) => {
            console.log("User profile refernece updated : " + user);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      const isVerificationMailSent = await sendMailToUser(
        email,
        "send-otp-link",
        `${process.env.BACKEND_URL}/api/verify/signup/${username}/${otp}`
      );

      if (!isVerificationMailSent) {
        return res.send({
          status: "failed",
          message: "Email not sent to user for verification!",
        });
      } else {
        res.send({ message: "Check your email for verification!" });
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// for tutee
exports.signupTutee = async (req, res) => {
  // try {
  const {
    userId,
    fname,
    lname,
    desc,
    country,
    status,
    profileURL,
    languages,
    skills,
    certification,
    website,
  } = req.body;

  // if (!userId || !fname || !lname || !desc || !country || !status || !languages || !profileURL || !skills) {
  //     res.status(500).send({ status: "failed", message: "Please fill required fields!" });
  // }

  let updatedProfile, updatedUser;
  console.log(req.body);
  console.log("**** " + userId);

  await UserProfile.findOneAndUpdate(
    { userId: userId },
    {
      fname,
      lname,
      desc,
      profileURL,
      languages,
      skills,
      certification,
      website,
      country,
      storyLine: status,
      $set: { [`linkedAccounts.website`]: website },
    },
    {
      new: true,
    }
  )
    .then(async (newUser) => {
      console.log(">>>", newUser);
      updatedProfile = newUser;

      await User.findOneAndUpdate(
        { userId: userId },
        {
          profileDetails: newUser,
          profileImage: profileURL,
          role: 1,
        }
      )
        .then((user) => {
          updatedUser = user;
        })
        .then(() => {
          return res
            .status(200)
            .send({
              status: "sucess",
              message: "Registered sucesfully!",
              profileDetails: updatedProfile,
            });
        })
        .catch((err) => {
          console.log("+++++++++++" + err);
          return res
            .status(500)
            .send({
              status: "failed",
              message: "User is not updated with new profile",
            });
        });
    })
    .catch((err) => {
      console.error("-------" + err);
      return res.status(200).send({ message: err.message, status: "failed" });
    });

  // } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: error.err, status: "failed" });
  // }
};

exports.signin = (req, res) => {
  try {
    User.findOne({
      email: req.body.email,
    })
      .populate("profileDetails", "-__v")
      .exec(async (err, user) => {
        console.log(user);
        if (err) {
          res.status(500).send({ status: "failed", message: err });
          return;
        }
        if (!user) {
          return res
            .status(404)
            .send({ status: "failed", message: "User Not found." });
        }

        if (!user.verified) {
          return res
            .status(500)
            .send({
              status: "failed",
              message:
                "Please Verify yourself! Check your email for verifiacation",
            });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        console.log("passwordIsValid : " + passwordIsValid);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            status: "failed",
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
          expiresIn: 360 * 86400, // 360*24 hours
        });

        await User.findByIdAndUpdate({ _id: user._id }, { token: token })
          .then((user) => {
            console.log("user updated sucefully!");
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: auth.controller.js ~ line 165 ~ ).then ~ e̥rr",
              err
            );
          });

        res.cookie("accessToken", token, { httpOnly: true });
        res.status(200).send({
          user: user,
          accessToken: token,
        });
      });
  } catch (error) {
    console.log(error);
  }
};
