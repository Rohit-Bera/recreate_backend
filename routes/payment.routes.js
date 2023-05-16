const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const {
  askForPayment,
  getAllPaymentsWorker,
  payAmount,
  getAllPaymentsUser,
} = require("../controllers/payment.controller");

// worker
// id -> orderId
router.post("/askForPayment/:id", workerauth, askForPayment);
router.get("/getAllPaymentWorker", workerauth, getAllPaymentsWorker);

// user
// id -> paymentId
router.put("/payAmount/:id", auth, payAmount);
router.get("/getAllPaymentUser", auth, getAllPaymentsUser);

module.exports = router;
