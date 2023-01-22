const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const {
  postOrderApi,
  getOrderedUserApi,
  cancelOrderApi,
  getBookedOrderApi,
  acceptOrderedApi,
  cancelOrderedApi,
  getServiceApi,
  getOrdersApi,
} = require("../controllers/order.controlller");

// customer
router.post("/bookService", auth, postOrderApi);
router.get("/getMyOrders", auth, getOrderedUserApi);
router.delete("/cancelMyOrder/:id", auth, cancelOrderApi);

// worker
router.get("/getUserOrders", workerauth, getBookedOrderApi);
router.put("/acceptOrder/:id", workerauth, acceptOrderedApi);
router.put("/cancelOrderService/:id", workerauth, cancelOrderedApi);

// admin
router.get("/getServices", auth, adminauth, getServiceApi);
router.get("/getOrders", auth, adminauth, getOrdersApi);

module.exports = router;
