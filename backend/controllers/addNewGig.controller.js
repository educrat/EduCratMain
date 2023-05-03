const User = require("../models/User.model");
const UserGig = require("../models/UserGig.model");

const addNewGig = async (req, res) => {
  try {
    const {
      userId,
      title,
      images,
      desc,
      category,
      keywords,
      pricing,
      learnings,
      language,
      learning,
      level,
      prerequisites,
      subtitle,
      toWhom,
    } = req.body;

    let updatedUser, newGig;

    if (!userId) {
      return res
        .status(500)
        .send({ status: "failed", message: "UserId required!" });
    }

    const newUserGig = await new UserGig({
      userId,
      title,
      images,
      desc,
      category,
      keywords,
      pricing,
      learnings,
      language,
      learning,
      level,
      prerequisites,
      subtitle,
      toWhom,
    });

    newUserGig.save(async (err, gig) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            status: "failed",
            message: "User is not updated with new gig",
          });
      }
      console.log("new gig added : ", gig);
      newGig = gig;

      await User.findOneAndUpdate(
        { userId: userId },
        {
          $push: { gigsInfo: gig },
        },
        { new: true }
      )
        .then((user) => {
          updatedUser = user;
          res
            .status(200)
            .send({
              status: "sucess",
              message: "Gig added sucesfully!",
              user,
              newGig,
            });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({
              status: "failed",
              message: "User is not updated with new gig",
            });
        });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ status: "failed", message: error.message });
  }
};

module.exports = addNewGig;
