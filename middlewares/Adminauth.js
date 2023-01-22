const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const HttpError = require("../middlewares/HttpError");

const Adminauth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const user = await User.findOne({ _id: decoded._id });

    if (user.type !== "admin") {
      const error = new HttpError(404, "admin not found!");
      console.log("error: ", error);
      response.json({ error });
      return { error };
    }

    next();
  } catch (err) {
    console.log("err: ", err);

    const error = new HttpError(500, "Internal error in Admin auth");
    return error;
  }
};

module.exports = Adminauth;
