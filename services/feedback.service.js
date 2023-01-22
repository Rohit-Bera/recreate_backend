const HttpError = require("../middlewares/HttpError");
const Feedback = require("../models/feedbackModel");

const postFeedbackVisitorService = async (body) => {
  try {
    const myFeedback = new Feedback(body);
    await myFeedback.save();

    if (!myFeedback) {
      const error = new HttpError(404, "Feedback was not sent!");
      return { error };
    }

    return { myFeedback };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const postFeedbackUserService = async (body) => {
  try {
    const myFeedback = new Feedback(body);
    await myFeedback.save();

    if (!myFeedback) {
      const error = new HttpError(404, "Feedback was not sent!");
      return { error };
    }

    return { myFeedback };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const postFeedbackWorkerService = async () => {};

const getFeedbackAdminService = async () => {};

module.exports = {
  postFeedbackUserService,
  postFeedbackVisitorService,
  postFeedbackWorkerService,
  getFeedbackAdminService,
};
