const sendMailToUser = require('../helpers/sendMailToUsers');

const forgetPassWordEmailSend = async (req, res) => {
    const { user } = res.locals;

    console.log(res.locals);

    const url = process.env.FRONTEND_URL + '/update-password/' + user.userId;

    const isEmailSend = await sendMailToUser(req.body.email, 'change-password', url);

    if (isEmailSend) {
        return res.status(200).send({ status: "sucess", message: "Link is sent on email to change the password" });
    } else {
        return res.status(500).send({ status: "failed", message: "Some error occured ..." })
    }

}

module.exports = forgetPassWordEmailSend;