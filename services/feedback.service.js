const HttpError = require("../middlewares/HttpError");
const Feedback = require("../models/feedbackModel");

//feedback user post service
const postUserFeedbackServices = async ({ detail }) => {
  try {
    const feed = new Feedback(detail);
    await feed.save();
    console.log("feed in s", feed);

    if (!feed) {
      const error = new HttpError(
        404,
        "Something went wring in feedback Services"
      );
      return { error };
      // console.log("error",error);
    }
    return { feed };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

//get all user feedback services
const getAllUserFeedbackServices = async () => {
  try {
    const allFeedback = await Feedback.find().populate("user");
    if (allFeedback) {
      return { allFeedback };
    } else {
      const error = new HttpError(404, "Sorry No Feedback yet");
      console.log("error: ", error);
      return { error };
    }
  } catch (err) {
    const error = new HttpError(
      404,
      "something went wrong in All User feeback Services!"
    );
    return { error };
  }
};

//delete user Feedback Service
const deleteuserFeedbackService = async (_id) => {
  try {
    const deleteFeedback = await Feedback.findByIdAndDelete({ _id });
    if (!deleteFeedback) {
      const error = new HttpError(404, "Feedback not Found!");
      console.log("error: ", error);
      return { error };
    }
    return { deleteFeedback };
  } catch (err) {
    const error = new HttpError(404, "Sorry can't delete Your Feedback");
    console.log("error: ", error);
    return { error };
  }
};

//feedback Client post service
const postWorkerFeedbackServices = async ({ detail }) => {
  console.log("detail", detail);
  try {
    // console.log("feedback",feedback);
    const feed = new Feedback(detail);
    await feed.save();
    console.log("feed in s", feed);

    if (!feed) {
      const error = new HttpError(
        404,
        "Something went wring in feedback Services"
      );
      return { error };
      // console.log("error",error);
    }
    return { feed };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

//get all feedback Client services
const getAllWorkerFeedbackServices = async () => {
  try {
    const allFeedback = await Feedback.find().populate("worker");
    if (allFeedback) {
      return { allFeedback };
    } else {
      const error = new HttpError(404, "Sorry No Feedback yet");
      console.log("error: ", error);
      return { error };
    }
  } catch (err) {
    const error = new HttpError(
      404,
      "something went wrong in All User feeback Services!"
    );
    return { error };
  }
};

//delete Client Feedback Service
const deleteWorkerFeedbackService = async (_id) => {
  try {
    const deleteFeedback = await Feedback.findByIdAndDelete({ _id });
    if (!deleteFeedback) {
      const error = new HttpError(404, "Feedback not Found!");
      console.log("error: ", error);
      return { error };
    }
    return { deleteFeedback };
  } catch (err) {
    const error = new HttpError(404, "Sorry can't delete Your Feedback");
    console.log("error: ", error);
    return { error };
  }
};

// >>>>>>>>>>>>>>>>>>>>  complaints

const postComplaintService = async ({ user, worker, complaint }) => {
  try {
    if (user) {
      const addComplaint = new Feedback({
        user,
        complaint,
        complaintStatus: false,
      });

      await addComplaint.save();

      if (!addComplaint) {
        const error = new HttpError(404, "complaint was not added!");
        console.log("error: ", error);
        return { error };
      }

      return { addComplaint };
    } else {
      const addComplaint = new Feedback({
        worker,
        complaint,
        complaintStatus: false,
      });

      await addComplaint.save();

      if (!addComplaint) {
        const error = new HttpError(404, "complaint was not added!");
        console.log("error: ", error);
        return { error };
      }

      return { addComplaint };
    }
  } catch (err) {
    const error = new HttpError(404, `Internal server error :${err} `);
    console.log("error: ", error);
    return { error };
  }
};

const getComplaintService = async ({ user, worker }) => {
  try {
    if (user) {
      const myComplaints = await Feedback.find({ user });

      if (!myComplaints) {
        const error = new HttpError(
          404,
          "you have not uploaded any complaints!"
        );
        console.log("error: ", error);
        return { error };
      }

      return { myComplaints };
    } else {
      const myComplaints = await Feedback.find({ worker });

      if (!myComplaints) {
        const error = new HttpError(
          404,
          "you have not uploaded any complaints!"
        );
        console.log("error: ", error);
        return { error };
      }

      return { myComplaints };
    }
  } catch (err) {
    const error = new HttpError(404, `Internal server error :${err} `);
    console.log("error: ", error);
    return { error };
  }
};

const deleteComplaintService = async (_id) => {
  try {
    const feedDeleted = await Feedback.findByIdAndDelete({ _id });

    if (!feedDeleted) {
      const error = new HttpError(404, "This feedback was not found!");
      console.log("error: ", error);
      return { error };
    }

    return { feedDeleted };
  } catch (err) {
    const error = new HttpError(404, `Internal server error :${err}`);
    console.log("error: ", error);
    return { error };
  }
};

//
const putComplaintService = async () => {};

module.exports = {
  postUserFeedbackServices,
  getAllUserFeedbackServices,
  deleteuserFeedbackService,
  postWorkerFeedbackServices,
  getAllWorkerFeedbackServices,
  deleteWorkerFeedbackService,
  postComplaintService,
  getComplaintService,
  deleteComplaintService,
  putComplaintService,
};
