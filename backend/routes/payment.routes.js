const router = require('express').Router();
const getOrders = require('../controllers/PaymentController/getOrders.contorller.js');
const {checkout, paymentVerification} = require('../controllers/PaymentController/payment.controller.js');

router.post("/checkout", checkout);

router.post("/paymentverification", paymentVerification);


module.exports = router;
