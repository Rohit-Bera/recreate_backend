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
  getOrdersApi,
  deleteOrderApi,
  getWorkerOrderById,
} = require("../controllers/order.controlller");

// customer
router.post("/bookService", auth, postOrderApi);
router.get("/getMyOrders", auth, getOrderedUserApi);
router.put("/cancelMyOrder/:id", auth, cancelOrderApi);
router.delete("/deleteMyOrder/:id", auth, deleteOrderApi);

// worker
router.get("/getUserOrders", workerauth, getBookedOrderApi);
router.get("/getWorkerOrderById", workerauth, getWorkerOrderById);
router.put("/acceptOrder/:id", workerauth, acceptOrderedApi);
router.put("/cancelOrderService/:id", workerauth, cancelOrderedApi);

// admin
router.get("/getOrders", auth, adminauth, getOrdersApi);

module.exports = router;
