const paymentService = require("../services/payment.service");

// worker
const askForPayment = async (request, response, next) => {
  const workerId = request.worker._id;

  const orderId = request.params.id;

  const { serviceCost, paymentInfo, userId } = request.body;

  const result = await paymentService.askForPaymentService({
    workerId,
    orderId,
    userId,
    serviceCost,
    paymentInfo,
  });

  const { newPayment, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, success: "payment was asked successfully!" });
};

const getAllPaymentsWorker = async (request, response, next) => {
  const workerId = request.worker._id;

  const result = await paymentService.getPaymentsWorkerService({ workerId });

  const { allPayments, error } = result;
  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allPayments });
};

const getBalanceWallet = async (request, response, next) => {
  const _id = request.worker._id;

  const result = await paymentService.getBalanceWalletService({ _id });

  const { error, myBalance } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, myBalance });
};

const withdrawFromWallet = async (request, response, next) => {
  const _id = request.worker._id;
  console.log("_id: ", _id);

  const { withdrawlAmt } = request.body;

  const result = await paymentService.withdrawFromWallet({ _id, withdrawlAmt });

  const { error, success } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ statsu: 200, success });
};

// user
const payAmount = async (request, response, next) => {
  const userId = request.user._id;

  const _id = request.params.id;

  const { paymentInfo } = request.body;

  const result = await paymentService.payAmountService({
    userId,
    _id,
    paymentInfo,
  });

  const { error, success } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, success });
};

const getAllPaymentsUser = async (request, response, next) => {
  const userId = request.user._id;

  const result = await paymentService.getPaymentsUserService({ userId });

  const { allPayments, error } = result;
  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allPayments });
};

module.exports = {
  askForPayment,
  getAllPaymentsWorker,
  payAmount,
  getAllPaymentsUser,
  getBalanceWallet,
  withdrawFromWallet,
};
