const HttpError = require("../middlewares/HttpError");
const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");
const Commision = require("../models/commisionModel");

// worker
const askForPaymentService = async ({
  workerId,
  orderId,
  userId,
  serviceCost,
  paymentInfo,
}) => {
  try {
    const ifDonePayment = await Payment.findOne({ order: orderId });

    if (ifDonePayment) {
      const error = new HttpError(404, ` payment was found with this orderID`);

      return { error };
    }

    const paymentData = {
      order: orderId,
      worker: workerId,
      user: userId,
      serviceCost,
      paymentInfo,
    };

    const newPayment = new Payment(paymentData);
    await newPayment.save();

    if (newPayment) {
      const percent = serviceCost * 0.1;

      const commiData = {
        order: orderId,
        commision: percent,
        commisionStatus: "pending",
      };

      const newCommision = new Commision(commiData);
      await newCommision.save();
    }

    return { newPayment };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getPaymentsWorkerService = async ({ workerId }) => {
  try {
    const allPayments = await Payment.find({ worker: workerId });

    if (!allPayments) {
      const error = new HttpError(404, ` no payments found! `);

      return { error };
    }

    return { allPayments };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// user
const payAmountService = async ({ userId, _id, paymentInfo }) => {
  try {
    const findPayment = await Payment.findById({ _id }).populate("order");
    console.log("findPayment: ", findPayment);

    if (!findPayment) {
      const error = new HttpError(404, ` Payment with this id was not found!`);

      return { error };
    }

    const { order, serviceCost } = findPayment;
    console.log("order consoled: ", order);

    // update order
    if (order) {
      const orderData = {
        paymentStatus: "paid",
      };

      const updatePaymentStatus = await Order.findByIdAndUpdate(
        { _id: order._id },
        { $set: orderData },
        { new: true }
      );
    }

    // commission
    const percent = serviceCost * 0.1;
    const finalAmount = serviceCost - percent;
    console.log("finalAmount: ", finalAmount);

    if (order) {
      const findCommOrder = await Commision.findOne({ order: order._id });

      if (!findCommOrder) {
        const error = new HttpError(404, ` commision id was not found!`);

        return { error };
      }

      const { _id } = findCommOrder;

      const commData = {
        order: order._id,
        commision: percent,
        commisionStatus: "received",
      };

      const commAccepted = await Commision.findByIdAndUpdate(
        { _id: _id },
        { $set: commData },
        { new: true }
      );
    }

    // update payment
    const paymentData = {
      paymentInfo,
      commision: percent,
      finalCost: finalAmount,
    };
    const updateMyPayment = await Payment.findByIdAndUpdate(
      { _id: _id },
      { $set: paymentData },
      { new: true }
    );

    return { success: "payment was made successfull!" };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getPaymentsUserService = async ({ userId }) => {
  try {
    const allPayments = await Payment.find({ user: userId });

    if (!allPayments) {
      const error = new HttpError(404, ` no payments found! `);

      return { error };
    }

    return { allPayments };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  askForPaymentService,
  getPaymentsWorkerService,
  payAmountService,
  getPaymentsUserService,
};
