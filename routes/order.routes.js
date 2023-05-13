const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const {
  postOrderApi,
  getOrderedUserApi,
  getBookedOrderApi,
  acceptOrderedApi,
  getOrdersApi,
  deleteOrderApi,
  getWorkerOrderById,
  postWorkkDoneApi,
  getOtpUserApi,
  workerVerifyOtpApi,
} = require("../controllers/order.controlller");

// customer
router.post("/bookService", auth, postOrderApi);
router.get("/getMyOrders", auth, getOrderedUserApi);
router.delete("/deleteMyOrder/:id", auth, deleteOrderApi);

router.get("/getOtpUser", auth, getOtpUserApi);

// worker
router.get("/getUserOrders", workerauth, getBookedOrderApi);
router.get("/getWorkerOrderById", workerauth, getWorkerOrderById);
router.put("/acceptOrder/:id", workerauth, acceptOrderedApi);
router.put("/onWorkCompleted/:id", workerauth, postWorkkDoneApi);

router.put("/verifyOtp", workerauth, workerVerifyOtpApi);

// admin
router.get("/getOrders", auth, adminauth, getOrdersApi);

module.exports = router;
