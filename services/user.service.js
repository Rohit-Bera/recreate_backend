const HttpError = require("../middlewares/HttpError");
const User = require("../models/userModel");
const Worker = require("../models/workerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// hashing password
const hashPassword = async (user) => {
  const hasedPassword = await bcrypt.hash(user.password, 8);
  return hasedPassword;
};

// token
const generateToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, "newuser");
  return token;
};

// hashing password worker
const hashPasswordWorker = async (worker) => {
  const hasedPassword = await bcrypt.hash(worker.password, 8);
  return hasedPassword;
};

// token worker
const generateTokenWorker = async (worker) => {
  const token = jwt.sign({ _id: worker._id.toString() }, "newuser");
  return token;
};

// findign user for login
const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  const worker = await Worker.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new HttpError(404, "Invalid password!");
      return { error };
    }

    return user;
  } else if (worker) {
    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      const error = new HttpError(404, "Invalid password!");
      return { error };
    }

    return worker;
  } else {
    const error = new HttpError(
      404,
      "account with this email id does not exist!"
    );
    return { error };
  }
};

// -----------------------------------------------------------
// sign up servcies
const signUpServices = async (body) => {
  console.log("body: ", body);
  const { email } = body;
  try {
    const isUser = await User.findOne({ email });
    const isWorker = await Worker.findOne({ email });

    if (isUser) {
      const error = new HttpError(404, "User already exist");
      console.log("error: ", error);
      return { error };
    }
    if (isWorker) {
      const error = new HttpError(404, "This email id already exist");
      console.log("error: ", error);
      return { error };
    }

    const user = new User(body);
    const hashedPassword = await hashPassword(user);
    user.password = hashedPassword;
    await user.save();
    const token = await generateToken(user);
    user.password = undefined;

    const successOnSignup = { user, token };

    return { successOnSignup };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// userLogin services
const loginServices = async (body) => {
  const { email, password } = body;
  console.log("password: ", password);
  console.log("email: ", email);
  try {
    const user = await findByCredentials(email, password);
    console.log("user ln-107: ", user);

    const { error } = user;
    if (error) {
      return { error };
    }

    const token = await generateToken(user);

    console.log("token: ", token);

    const logUser = { user, token };

    user.password = undefined;

    return { logUser };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// edit user services
const editUserServices = async ({ _id, data }) => {
  try {
    const updated = await User.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "User not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// change password for user
const changeUserPassService = async ({ _id, data }) => {
  console.log("data: ", data);
  try {
    const hashedPassword = await hashPassword(data);
    data.password = hashedPassword;

    const updated = await User.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "User not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// -----------------------------------------------------------

// signup for worker
const signUpworkerServices = async (body) => {
  console.log("body: ", body);
  const { email } = body;
  try {
    const isWorker = await Worker.findOne({ email });
    const isUser = await User.findOne({ email });

    if (isWorker) {
      const error = new HttpError(404, "Worker already exist");
      console.log("error: ", error);
      return { error };
    }

    if (isUser) {
      const error = new HttpError(404, "This email id already exist");
      console.log("error: ", error);
      return { error };
    }

    const worker = new Worker(body);
    const hashedPassword = await hashPasswordWorker(worker);
    worker.password = hashedPassword;
    await worker.save();
    const token = await generateTokenWorker(worker);
    worker.password = undefined;

    const successOnSignup = { worker, token };

    return { successOnSignup };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// edit worker services
const editWorkerServices = async ({ _id, data }) => {
  console.log("data: ", data);
  try {
    const updated = await Worker.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "Worker not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

const changeWorkerPassService = async ({ _id, data }) => {
  console.log("data: ", data);
  try {
    const hashedPassword = await hashPasswordWorker(data);
    data.password = hashedPassword;

    const updated = await Worker.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "Worker not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// -----------------------------------------------------------

const deleteUserService = async ({ _id }) => {
  console.log("_id: ", _id);

  try {
    const deleteUser = await User.findByIdAndDelete({ _id });

    if (!deleteUser) {
      const error = new HttpError(404, "User not found!");
      return { error };
    }

    return { deleteUser };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error: ${e}`);

    return { error };
  }
};

const deleteWorkerSevice = async ({ _id }) => {
  console.log("_id: ", _id);

  try {
    const deleteWorker = await Worker.findByIdAndDelete({ _id });

    if (!deleteWorker) {
      const error = new HttpError(404, "User not found!");
      return { error };
    }

    return { deleteWorker };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error: ${e}`);

    return { error };
  }
};

const getAllUsersService = async () => {
  try {
    const users = await User.find();

    if (!users) {
      const error = new HttpError(404, "users not found");

      return { error };
    }

    return { users };
  } catch (e) {
    console.log("e: ", e);

    const error = HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getAllWorkersService = async () => {
  try {
    const workers = await Worker.find();

    if (!workers) {
      const error = new HttpError(404, "workers not found");

      return { error };
    }

    return { workers };
  } catch (e) {
    console.log("e: ", e);

    const error = HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  signUpServices,
  loginServices,
  editUserServices,
  changeUserPassService,
  //   -------------------------
  signUpworkerServices,
  editWorkerServices,
  changeWorkerPassService,
  //   -------------------------
  deleteUserService,
  deleteWorkerSevice,
  getAllUsersService,
  getAllWorkersService,
};
