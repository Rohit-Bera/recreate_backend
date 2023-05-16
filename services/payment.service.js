const HttpError = require("../middlewares/HttpError");
const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");
const Commision = require("../models/commisionModel");
const Wallet = require("../models/walletModel");

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

    const orderData = {
      paymentStatus: "asked for payment",
    };

    const updatePaidOrder = await Order.findByIdAndUpdate(
      { _id: orderId },
      { $set: orderData },
      { new: true }
    );

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

const getBalanceWalletService = async ({ _id }) => {
  try {
    const myBalance = await Wallet.findOne({ worker: _id });

    if (!myBalance) {
      const error = new HttpError(500, `Wallet was not found!`);

      return { error };
    }

    return { myBalance };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const withdrawFromWallet = async ({ _id, withdrawlAmt }) => {
  try {
    const myWallet = await Wallet.findOne({ worker: _id });
    console.log("myWallet: ", myWallet);

    if (!myWallet) {
      const error = new HttpError(500, `Wallet was not found!`);

      return { error };
    }

    const totalAmount = myWallet.TotalBalance - withdrawlAmt;

    const store = myWallet.transaction;
    const item = { type: "withdraw", date: new Date(), amount: withdrawlAmt };
    store.push(item);

    const walletData = {
      TotalBalance: totalAmount,
      transaction: store,
    };

    const newTransaction = await Wallet.findByIdAndUpdate(
      { _id: myWallet._id },
      { $set: walletData },
      { new: true }
    );

    return { success: "Amount Withdrawn successfull!" };
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

    // ----------------- update order
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
    // -----------------

    // ----------------- commission
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
    // -----------------

    // ----------------- wallet
    if (order) {
      const findWallet = await Wallet.findOne({ worker: order.worker });
      console.log("findWallet: ", findWallet);

      if (!findWallet) {
        const walletData = {
          worker: order.worker,
          TotalBalance: finalAmount,
          transaction: [
            { type: "deposit", date: new Date(), amount: finalAmount },
          ],
        };

        const newTransaction = new Wallet(walletData);
        await newTransaction.save();
      } else {
        const totalAmount = findWallet.TotalBalance + finalAmount;

        const store = findWallet.transaction;
        const item = { type: "deposit", date: new Date(), amount: finalAmount };
        store.push(item);

        const walletData = {
          TotalBalance: totalAmount,
          transaction: store,
        };

        const newTransaction = await Wallet.findByIdAndUpdate(
          { _id: findWallet._id },
          { $set: walletData },
          { new: true }
        );
      }
    }
    // -----------------

    // ----------------- update payment
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
    // -----------------

    return { success: "payment was made successfull!" };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getPaymentsUserService = async ({ userId }) => {
  try {
    const allPayments = await Payment.find({ user: userId }).populate("order");

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
  getBalanceWalletService,
  withdrawFromWallet,
};
