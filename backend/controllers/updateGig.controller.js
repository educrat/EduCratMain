const UserGig = require("../models/UserGig.model");

const updateGig = async (req, res) => {
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
    gig_id,
  } = req.body;

  // if (!userId || !title || !images /*|| !desc || !category || !keywords || !pricing || !learnings || !language || !learning || !level || !prerequisites || !subtitle || !toWhom) {
  //     return res.status(500).send({ status: "failed", message: "All fields are required!" })
  // }

  try {
    await UserGig.updateOne(
      { _id: gig_id },
      {
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
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed a",
            message: "something went wrong while updating gig",
          });
        }
        return res
          .status(200)
          .json({ status: "success", message: "gig updated" });
      }
    ).clone();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed b", message: error.message });
  }
};
module.exports = updateGig;
