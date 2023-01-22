const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const HttpError = require("../middlewares/HttpError");

const Auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      const error = new HttpError(401, "please authenticate!");
      console.log("error: ", error);
      response.json({ error });
      return { error };
    }

    request.token = token;
    request.user = user;

    next();
  } catch (err) {
    console.log("error: ", err);

    const error = new HttpError(500, "something went wrong in authentication");

    response.json(error);
    return error;
  }
};

module.exports = Auth;
