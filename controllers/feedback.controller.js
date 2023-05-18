const feedbackService = require("../services/feedback.service");

//postfeedback user controller
const postuserFeedback = async (request, response, next) => {
  const user = request.user._id;
  const feedback = request.body.feedback;
  // console.log("feedback:", feedback)
  const detail = { feedback, user };
  const data = await feedbackService.postUserFeedbackServices({ detail });
  const { feed, error } = data;
  console.log("postfeedback", feed);
  if (error) {
    response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", feed });
};

//get all user feedback
const getalluserFeedback = async (request, response, next) => {
  const data = await feedbackService.getAllUserFeedbackServices();
  const { allFeedback, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allFeedback });
};

//delete user feedback
const deleteuserFeedback = async (request, response, next) => {
  const _id = request.params.id;
  const user = request.user;
  const data = feedbackService.deleteuserFeedbackService(_id);
  const { deleteFeedback, error } = data;
  if (error) {
    // response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", deleteFeedback });
};

//Worker postfeedback controller
const postWorkerFeedback = async (request, response, next) => {
  const worker = request.worker._id;
  const feedback = request.body.feedback;
  console.log("feedback:", feedback);
  const detail = { feedback, worker };
  const data = await feedbackService.postWorkerFeedbackServices({ detail });
  const { feed, error } = data;
  console.log("postfeedback", feed);
  if (error) {
    response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", feed });
};

//get all worker feedback
const getallWorkerFeedback = async (request, response, next) => {
  const data = await feedbackService.getAllWorkerFeedbackServices();
  const { allFeedback, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allFeedback });
};

//delete user worker feedback
const deleteWorkerFeedback = async (request, response, next) => {
  const _id = request.params.id;
  const data = feedbackService.deleteWorkerFeedbackService(_id);
  const { deleteFeedback, error } = data;
  if (error) {
    // response.json(error);
    return next(error);
    // console.log("error",error);
  }
  response.json({ status: "200", deleteFeedback });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  complaints

const postComplaintApi = async (request, response, next) => {
  const { complaint } = request.body;

  if (request.user) {
    const user = request?.user._id;
    const reply = await feedbackService.postComplaintService({
      user,
      complaint,
    });

    const { addComplaint, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, addComplaint });
  } else {
    const worker = request?.worker._id;

    const reply = await feedbackService.postComplaintService({
      worker,
      complaint,
    });

    const { addComplaint, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, addComplaint });
  }
};

const getComplaintAPi = async (request, response, next) => {
  if (request.user) {
    const user = request?.user._id;
    const reply = await feedbackService.getComplaintService({ user });

    const { myComplaints, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, myComplaints });
  } else {
    const worker = request?.worker._id;

    const reply = await feedbackService.getComplaintService({
      worker,
    });

    const { myComplaints, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, myComplaints });
  }
};

const deleteComplaintApi = async (request, response, next) => {
  const id = request.params.id;

  if (request.user) {
    // const user = request?.user._id;

    const reply = await feedbackService.deleteComplaintService(id);

    const { feedDeleted, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, feedDeleted });
  } else {
    const reply = await feedbackService.deleteComplaintService(id);

    const { feedDeleted, error } = reply;

    if (error) {
      response.json({ error });
      return next(error);
    }

    response.json({ status: 200, feedDeleted });
  }
};

// admin
const putComplaintApi = async (request, response, next) => {};

module.exports = {
  postuserFeedback,
  getalluserFeedback,
  deleteuserFeedback,
  postWorkerFeedback,
  getallWorkerFeedback,
  deleteWorkerFeedback,
  postComplaintApi,
  getComplaintAPi,
  deleteComplaintApi,
  putComplaintApi,
};
