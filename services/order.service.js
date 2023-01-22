const Service = require("../models/serviceModel");
const Order = require("../models/orderModel");
const HttpError = require("../middlewares/HttpError");

// customer services
const bookOrderServices = async ({ _id, body }) => {
  try {
    const { service, request } = body;

    const user = _id;

    const data = { user, service, request };

    const serviceBooked = new Service(data);
    await serviceBooked.save();

    if (!serviceBooked) {
      const error = new HttpError(
        404,
        "Your service was not booked, Please try again after sometime"
      );

      return { error };
    }

    return { serviceBooked };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getOrderedServices = async (id) => {
  console.log("id: ", id);
  try {
    const orders = await Service.find({ user: id });
    console.log("orders: ", orders);

    if (!orders) {
      const error = new HttpError(
        404,
        "Orders not found! , Please try again after sometimes"
      );

      return { error };
    }

    return { orders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const cancelOrderServices = async ({ _id }) => {
  try {
    const canceled = await Service.findByIdAndDelete({ _id });

    if (!canceled) {
      const error = new HttpError(404, "Order was not found!");

      return { error };
    }

    return { canceled };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// client services
const getBookedOrderServices = async (worker) => {
  console.log("worker: ", worker);

  const service = worker.profession;

  try {
    const getOrders = await Service.find({ service });

    if (!getOrders) {
      const error = new HttpError(404, `Orders were not found! , please check`);

      return { error };
    }

    return { getOrders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const acceptOrderedServices = async ({ id, workerId }) => {
  try {
    const body = {
      serviceStatus: "accepted",
    };
    const acceptedservice = await Service.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    console.log("acceptedservice: ", acceptedservice);

    if (!acceptedservice) {
      const error = new HttpError(404, `Service was cancelled!`);

      return { error };
    }
    const { _id, user } = acceptedservice;
    const service = _id;
    const data = {
      worker: workerId,
      user,
      service: _id,
    };

    console.log("data: ", data);

    const acceptOrder = new Order(data);
    await acceptOrder.save();

    if (!acceptOrder) {
      const error = new HttpError(404, "order was not accepted");

      return { error };
    }

    return { acceptOrder, acceptedservice };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return [error];
  }
};

const cancelOrderedServices = async (id) => {
  try {
    const orderCanceled = await Order.findByIdAndDelete({ _id: id });
    console.log("orderCanceled: ", orderCanceled);

    if (!orderCanceled) {
      const error = new HttpError(404, "order was not found!");

      return { error };
    }

    const { service } = orderCanceled;

    const body = {
      serviceStatus: "pending",
    };
    const cancelService = await Service.findByIdAndUpdate(
      { _id: service },
      { $set: body },
      { new: true }
    );

    return { orderCanceled, cancelService };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// admin
const getBookedServices = async () => {
  try {
    const services = await Service.find();

    if (!services) {
      const error = new HttpError(404, "User requests were not found!");

      return { error };
    }

    return { services };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getOrdersServices = async () => {
  try {
    const orders = await Order.find();

    if (!orders) {
      const error = new HttpError(404, "Orders not found!");

      return { error };
    }

    return { orders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return [error];
  }
};

module.exports = {
  bookOrderServices,
  getOrderedServices,
  cancelOrderServices,
  getBookedOrderServices,
  acceptOrderedServices,
  cancelOrderedServices,
  getBookedServices,
  getOrdersServices,
};
