const { signup, signin, signupTutee } = require('../controllers/auth.controller');
const checkDuplicateUsernameOrEmail = require('../middlewares/verifySignup');
const bp = require('body-parser');
const checkIsUserExists = require('../middlewares/checkIsUserExists');
const forgetPassWordEmailSend = require('../controllers/forgetPassWordEmailSend.controller');
const updatePassword = require('../controllers/updatePassword.controller');
const verifyUser = require('../controllers/verifyUser.controller');
const validateToken = require('../controllers/validateToken.controller');

module.exports = function (app) {
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        checkDuplicateUsernameOrEmail,
        signup
    );

    app.post(
        "/api/auth/signin",
        signin
    );

    app.post(
        "/api/auth/signup-tutee",
        signupTutee
    )

    app.post("/api/forget-password",
        checkIsUserExists,
        forgetPassWordEmailSend
    )

    app.post("/api/update-password",
        updatePassword
    )

    app.get("/api/verify/signup/:username/:otp", verifyUser);

    app.get("/user/:token", validateToken);



};