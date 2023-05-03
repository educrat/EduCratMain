const { userBoard } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/authJwt");
const addNewGig = require('../controllers/addNewGig.controller');
const getUserDetails = require("../controllers/getUserDetails.controller");
const getUserGig = require("../controllers/getUserGig.controller");
const getAllUserDetails = require("../controllers/getAllUserDetails.controller");
const search = require("../controllers/search.controller");
const findGigsByKeyword = require("../controllers/findGigsByKeyword.controller");
const UserGig = require("../models/UserGig.model.js");
const gigSuggestions = require("../controllers/gigSuggestions.controller");
const getUserDetailsBy_Id = require("../controllers/getUserDetailsBy_Id.controller");
const deleteGig = require("../controllers/deleteGig.controller");
const updateGig = require("../controllers/updateGig.controller");
const findGigByCategory = require("../controllers/findGigByCategory.controller");
const getAllUserDetailsForAdmin = require("../controllers/adminControllers/getAllUserDetailsForAdmin.controller");
const getAllTransactions = require("../controllers/adminControllers/getAllTransactions.controller");
const requestRevision = require("../controllers/FeedbackControllers/requestRevison.controller");
const completeRevision = require("../controllers/FeedbackControllers/completeRevision");
const completeOrder = require("../controllers/FeedbackControllers/completeOrder");
const teacherCompleteOrder = require("../controllers/FeedbackControllers/teacherCompleteOrder");
const submitFeedback = require("../controllers/FeedbackControllers/submitFeedback");
const getFeedback = require("../controllers/FeedbackControllers/getFeddback");
const getAllFeedbacks = require("../controllers/FeedbackControllers/getAllFeedbacks");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/test/user", verifyToken, userBoard);

    app.get('/api/alldetails/user/:userId', getAllUserDetails);

    app.get('/api/user/:userId', getUserDetails)

    app.get('/api/user/byUserId/:_id', getUserDetailsBy_Id);

    app.get('/api/admin/allUsers', getAllUserDetailsForAdmin);

    app.get('/api/admin/txns', getAllTransactions )

    app.post("/api/add/gig", addNewGig)

    app.get('/api/gig/:gigId', getUserGig);

    app.post('/api/update/gig', updateGig);

    app.get('/api/search', search)

    app.post('/api/delete/gig/', deleteGig)

    app.get('/api/gig-by-keyword/:keyword', findGigsByKeyword)

    app.get('/api/gig-by-catgory/:category', findGigByCategory)

    app.get('/api/gig-suggestion', gigSuggestions)

    app.get('/api/test/gig/:id', async (req, res) => {
        const gig = await UserGig.findById(req.params.id);
        res.status(200).send(gig);
    })

    app.get('/api/feedbacks', getAllFeedbacks)
    app.get('/api/feedback/:feedbackId/', getFeedback);
    app.post('/api/feedback/request-revison/', requestRevision);
    app.post('/api/feedback/complete-revision/', completeRevision);
    app.post('/api/feedback/complete-order/', completeOrder);
    app.post('/api/feedback/teacher-complete-order/', teacherCompleteOrder);

    // this is used to store the feedback from values in Feedback in DB
    app.post('/api/user/feedback/:feedbackId/:usertype', submitFeedback);

    // app.get('/api/feedback/')


    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard  
    // ); 
    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};