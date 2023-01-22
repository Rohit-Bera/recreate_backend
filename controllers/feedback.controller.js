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
  const feed = request.body;

  const client = request.client._id;

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

const getFeedbackAdmin = async (request, response, next) => {};

module.exports = {
  postFeedbackVisitor,
  postFeedbackUser,
  postFeedbackWorker,
  getFeedbackAdmin,
};
