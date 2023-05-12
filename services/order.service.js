const Order = require("../models/orderModel");
const HttpError = require("../middlewares/HttpError");
const Otpverify = require("../models/otpVerificationModel");

// customer services
const bookOrderServices = async ({ data }) => {
  console.log("data: ", data);

  try {
    const { user, request, service, orderStatus } = data;

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
      const findServicePending = await Order.findOne({
        user,
        service,
        orderStatus: "pending",
      });

      const findServiceAccepted = await Order.findOne({
        user,
        service,
        orderStatus: "pending",
      });

      if (findServicePending || findServiceAccepted) {
        const error = new HttpError(
          404,
          "you have already booked this service!"
        );

        return { error };
      }
    }

    const newBookedService = new Order(data);
    await newBookedService.save();

    const minm = 100000;
    const maxm = 999999;
    const num = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    console.log("num: ", num);

    const otpData = {
      userid: user,
      orderid: newBookedService._id,
      otp: num,
    };

    const otp = new Otpverify(otpData);
    await otp.save();

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

const getotpForOrderedServices = async (id) => {
  console.log("id: ", id);
  try {
    const allOtps = await Otpverify.find({ userid: id });
    console.log("allOtps: ", allOtps);

    if (!allOtps) {
      const error = new HttpError(404, "no orders added yet placed yet!");

      return { error };
    }

    return { allOtps };
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
      .populate("service")
      .sort({ bookedDate: 1 });

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

const getWorkerOrderbyIdServices = async ({ worker }) => {
  try {
    const workerOrders = await Order.find({ worker })
      .populate("user")
      .populate("worker")
      .populate("service")
      .sort({ visitDate: 1 });

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

const workCompletedService = async ({ worker, orderStatus, serviceId }) => {
  try {
    const data = {
      worker,
      orderStatus: orderStatus,
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

const workerVerifyOtpServices = async ({ userid, orderid, otp }) => {
  try {
    const verifyOtp = await Otpverify.findOne({ userid, orderid, otp });

    if (!verifyOtp) {
      const error = new HttpError(404, "please add correct otp!");

      return { error };
    }

    const data = {
      visitDate: new Date(),
      orderStatus: "progress",
    };

    const startOrder = await Order.findByIdAndUpdate(
      { _id: orderid },
      { $set: data },
      { new: true }
    );

    if (!startOrder) {
      const error = new HttpError(404, "order was not found!");

      return { error };
    }

    if (startOrder) {
      const _id = verifyOtp._id;
      const deleteOtp = await Otpverify.findByIdAndDelete({ _id });

      console.log("deleteOtp: ", deleteOtp);
      console.log("otp deleted successfully!");
    }

    const verified = "OTP was verified , Start work!";

    return { verified };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
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
    const orders = await Order.find()
      .populate("worker")
      .populate("user")
      .populate("service");

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
  getWorkerOrderbyIdServices,
  workCompletedService,
  acceptOrderedServices,
  cancelOrderedServices,
  getOrdersServices,
  deleteOrderServices,
  getotpForOrderedServices,
  workerVerifyOtpServices,
};
