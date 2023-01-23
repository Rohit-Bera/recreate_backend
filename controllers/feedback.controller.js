const feedbackService = require("../services/feedback.service");

const postFeedbackVisitor = async (request, response, next) => {
  const body = request.body;

  const reply = await feedbackService.postFeedbackVisitorService(body);

  const { error, myFeedback } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, myFeedback });
};

const postFeedbackUser = async (request, response, next) => {
  const feed = request.body;

  const user = request.user._id;

  const feedback = feed.feedback;
  console.log("feedback: ", feedback);

  const body = { feedback, user };
  console.log("body: ", body);

  const reply = await feedbackService.postFeedbackUserService(body);

  const { error, myFeedback } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, myFeedback });
};

const postFeedbackWorker = async (request, response, next) => {
  const worker = request.worker._id;

  const feedback = request.body.feedback;
  console.log("feedback: ", feedback);

  const body = { feedback, worker };
  console.log("body: ", body);

  const reply = await feedbackService.postFeedbackWorkerService(body);

  const { error, myFeedback } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, myFeedback });
};

const getFeedbackAdmin = async (request, response, next) => {
  const reply = await feedbackService.getFeedbackAdminService();

  const { error, feedbacks } = reply;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (feedbacks.length === 0) {
    return response.json({ status: 400, Message: "No Feedbacks listed" });
  }

  response.json({ status: 200, feedbacks });
};

module.exports = {
  postFeedbackVisitor,
  postFeedbackUser,
  postFeedbackWorker,
  getFeedbackAdmin,
};
