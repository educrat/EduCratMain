const Payment = require("../../models/paymentModel");

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Payment.find({});
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send({ status: "failed", message: error });
    }
}

module.exports = getAllTransactions;