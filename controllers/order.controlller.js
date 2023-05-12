// contains 2 model -> servcie , order
const orderService = require("../services/order.service");

// ---------------------------------- customer
// service order is placed
const postOrderApi = async (request, response, next) => {
  const user = request.user;

  const data = request.body;

  data.user = user._id;
  data.orderStatus = "pending";

  const result = await orderService.bookOrderServices({ data });

  const { newBookedService, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, newBookedService });
};

const getOrderedUserApi = async (request, response, next) => {
  const userId = request.user._id;

  const result = await orderService.getOrderedServices(userId);

  const { orders, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, orders });
};

//get all otps
const getOtpUserApi = async (request, response, next) => {
  const userId = request.user._id;

  const result = await orderService.getotpForOrderedServices(userId);

  const { allOtps, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, allOtps });
};

// add-chrge
const cancelOrderApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await orderService.cancelOrderServices({ _id });

  const { canceled, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, success: "Order was canceled!" });
};

const deleteOrderApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await orderService.deleteOrderServices({ _id });

  const { deletedOrder, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, success: "Order was deleted" });
};

// --------------------------------  worker

const getBookedOrderApi = async (request, response, next) => {
  const result = await orderService.getBookedOrderServices();
  const { workerOrders, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, workerOrders });
};

const getWorkerOrderById = async (request, response, next) => {
  const worker = request.worker._id;

  const result = await orderService.getWorkerOrderbyIdServices({ worker });

  const { workerOrders, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, workerOrders });
};

const acceptOrderedApi = async (request, response, next) => {
  const worker = request.worker._id;

  const serviceId = request.params.id;

  const { visitDate } = request.body;
  const result = await orderService.acceptOrderedServices({
    worker,
    visitDate,
    serviceId,
  });

  const { error, acceptOrder } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, success: "Order was accepted", acceptOrder });
};

const postWorkkDoneApi = async (request, response, next) => {
  const worker = request.worker._id;

  const serviceId = request.params.id;

  const { orderStatus } = request.body;
  const result = await orderService.workCompletedService({
    worker,
    orderStatus,
    serviceId,
  });

  const { error, acceptOrder } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, success: "Order was accepted", acceptOrder });
};

const workerVerifyOtpApi = async (request, response, next) => {
  const { userid, orderid, otp } = request.body;

  const result = await orderService.workerVerifyOtpServices({
    userid,
    orderid,
    otp,
  });

  const { verified, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, verified });
};

// worker cancel order
const cancelOrderedApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await orderService.cancelOrderedServices({ _id });

  const { error, orderCanceled, cancelService } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, orderCanceled, cancelService });
};

//----------------------------------- admin

const getOrdersApi = async (request, response, next) => {
  const reply = await orderService.getOrdersServices();

  const { error, orders } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (orders.length === 0) {
    return response.json({ status: 400, Message: "No orders placed yet" });
  }

  response.json({ status: 200, orders });
};

module.exports = {
  postOrderApi,
  getOrderedUserApi,
  cancelOrderApi,
  deleteOrderApi,
  getBookedOrderApi,
  acceptOrderedApi,
  cancelOrderedApi,
  getWorkerOrderById,
  getOrdersApi,
  postWorkkDoneApi,
  getOtpUserApi,
  workerVerifyOtpApi,
};
