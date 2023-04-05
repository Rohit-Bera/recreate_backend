const Order = require("../models/orderModel");
const HttpError = require("../middlewares/HttpError");

// customer services
const bookOrderServices = async ({ data }) => {
  console.log("data: ", data);

  try {
    const { bookedDate, user, request, service, orderStatus } = data;

    if (request) {
      const findReqPending = await Order.findOne({
        user,
        request,
        orderStatus: "pending",
      });

      const findReqAccepted = await Order.findOne({
        user,
        request,
        orderStatus: "accepted",
      });

      if (findReqPending || findReqAccepted) {
        console.log("error occured");

        const error = new HttpError(
          404,
          "You have already booked this request"
        );

        return { error };
      }
    }

    if (service) {
      const findService = await Order.findOne({
        user,
        service,
        orderStatus: "pending",
      });
      console.log("findService: ", findService);

      if (findService) {
        const error = new HttpError(
          404,
          "you have already same booked service!"
        );

        return { error };
      }
    }

    const newBookedService = new Order(data);
    await newBookedService.save();

    // const newBookedService = "success!";

    return { newBookedService };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getOrderedServices = async (id) => {
  console.log("id: ", id);
  try {
    const orders = await Order.find({ user: id })
      .populate("service")
      .populate("worker");
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
    const data = {
      orderStatus: "canceled",
    };

    const canceled = await Order.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    console.log("canceled: ", canceled);

    if (!canceled) {
      const error = new HttpError(404, "Booked service was not found!");

      return { error };
    }

    return { canceled };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const deleteOrderServices = async ({ _id }) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete({ _id });

    if (!deletedOrder) {
      const error = new HttpError(404, "order service was not found!");

      return { error };
    }

    return { deletedOrder };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// worker services
const getBookedOrderServices = async () => {
  try {
    const workerOrders = await Order.find()
      .populate("user")
      .populate("worker")
      .populate("service");

    if (!workerOrders) {
      const error = new HttpError(404, "worker orders nto found");

      return { error };
    }

    return { workerOrders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const acceptOrderedServices = async ({ worker, visitDate, serviceId }) => {
  try {
    const data = {
      worker,
      visitDate: visitDate ? visitDate : new Date(),
      orderStatus: "accepted",
    };

    const acceptOrder = await Order.findByIdAndUpdate(
      { _id: serviceId },
      { $set: data },
      { new: true }
    );

    if (!acceptOrder) {
      const error = new HttpError(404, "order was not updated!");

      return { error };
    }

    return { acceptOrder };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return [error];
  }
};

// worker cancel order!
const cancelOrderedServices = async ({ _id }) => {
  try {
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// admin

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
  getOrdersServices,
  deleteOrderServices,
};
