// contains 2 model -> servcie , order
const orderService = require("../services/order.service");

// ---------------------------------- customer
// service is placed
const postOrderApi = async (request, response, next) => {
  const _id = request.user._id;
  console.log("user: ", _id);

  const body = request.body;
  console.log("body: ", body);

  const result = await orderService.bookOrderServices({ _id, body });

  const { serviceBooked, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, serviceBooked });
};

const getOrderedUserApi = async (request, response, next) => {
  const userId = request.user._id;
  console.log("userId: ", userId);

  const result = await orderService.getOrderedServices(userId);

  const { orders, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, orders });
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

  response.json({ status: 200, canceled });
};

// --------------------------------  worker

const getBookedOrderApi = async (request, response, next) => {
  const worker = request.worker;

  const result = await orderService.getBookedOrderServices(worker);
  const { getOrders, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, getOrders });
};

const acceptOrderedApi = async (request, response, next) => {
  const id = request.params.id;

  const workerId = request.worker._id;

  const result = await orderService.acceptOrderedServices({ id, workerId });

  const { error, acceptOrder, acceptedservice } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, acceptOrder, acceptedservice });
};

const cancelOrderedApi = async (request, response, next) => {
  const id = request.params.id;

  const result = await orderService.cancelOrderedServices(id);

  const { error, orderCanceled, cancelService } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, orderCanceled, cancelService });
};

// admin

const getServiceApi = async (request, response, next) => {
  const reply = await orderService.getBookedServices();

  const { services, error } = reply;

  if (error) {
    response.json({ error });

    return next(error);
  }

  if (services.length === 0) {
    return response.json({ status: 400, Message: "No Services Booked Yet!" });
  }

  response.json({ status: 200, services });
};

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
  getBookedOrderApi,
  acceptOrderedApi,
  cancelOrderedApi,
  getServiceApi,
  getOrdersApi,
};
