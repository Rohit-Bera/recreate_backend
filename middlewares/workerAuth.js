const Worker = require("../models/workerModel");
const jwt = require("jsonwebtoken");
const HttpError = require("../middlewares/HttpError");

const workerAuth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const worker = await Worker.findOne({ _id: decoded._id });
    console.log("worker: ", worker);

    if (!worker) {
      const error = new HttpError(401, "please authenticate!");
      console.log("error: ", error);

      response.json({ error });

      return { error };
    }

    request.token = token;
    request.worker = worker;

    next();
  } catch (err) {
    console.log("error: ", err);

    const error = new HttpError(
      500,
      "something went wrong in worker authentication"
    );

    response.json({ error });
    return error;
  }
};

module.exports = workerAuth;
