const userService = require("../services/user.service");
// nodemailer
require("dotenv").config();

const login = async (request, response, next) => {
  const { email, password } = request.body;
  const data = await userService.loginServices(request.body);

  const { logUser, error } = data;
  console.log("error login: ", error);
  console.log("logUser: ", logUser);

  if (error) {
    response.json({ error });
    return next(error);
  }
  response.json({ status: 200, logUser });
};

// -------------------------------------------------------------------
// <<<   users   >>>
const signUpUser = async (request, response, next) => {
  const { name, email } = request.body;
  console.log("request.body: ", request.body);

  const data = await userService.signUpServices(request.body);

  const { successOnSignup, error } = data;

  //for email
  //   if(successOnSignup){
  //   }

  if (error) {
    response.json({ error });
    return next(error);
  }

  const { user, token } = successOnSignup;

  response.json({ status: 200, user, token });
};

const editUser = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateUser = await userService.editUserServices({ _id, data });

  const { updated, error } = updateUser;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, message: "data updated successfully", updated });
};

const changeUserPass = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateUser = await userService.changeUserPassService({ _id, data });

  const { updated, error } = updateUser;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "user password updated successfully",
    updated,
  });
};

const forgotPassword = async (request, response, next) => {};

// -------------------------------------------------------------------
// <<<   workers   >>>
const signUpWorker = async (request, response, next) => {
  const { name, email } = request.body;
  console.log("request.body: ", request.body);

  const data = await userService.signUpworkerServices(request.body);

  const { successOnSignup, error } = data;

  //for email
  //   if(successOnSignup){
  //   }

  if (error) {
    response.json({ error });
    return next(error);
  }

  const { worker, token } = successOnSignup;

  response.json({ status: 200, worker, token });
};

const editWorker = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateWorker = await userService.editWorkerServices({ _id, data });

  const { updated, error } = updateWorker;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, message: "data updated successfully", updated });
};

const changeWorkerPass = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateUser = await userService.changeWorkerPassService({ _id, data });

  const { updated, error } = updateUser;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "worker password updated successfully",
    updated,
  });
};

const forgotPasswordWorker = async (request, response, next) => {};

// -------------------------------------------------------------------
// <<<    admin    >>>
const deleteUser = async (request, response, next) => {
  const _id = request.params.id;

  const deleted = await userService.deleteUserService({ _id });

  const { deleteUser, error } = deleted;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "user deleted successfully",
    deleteUser,
  });
};

const deleteWorker = async (request, response, next) => {
  const _id = request.params.id;

  const deleted = await userService.deleteWorkerSevice({ _id });

  const { deleteWorker, error } = deleted;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "worker deleted successfully",
    deleteWorker,
  });
};

const getAllUsers = async (request, response, next) => {
  const allUsers = await userService.getAllUsersService();

  const { users, error } = allUsers;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    users,
  });
};

const getAllWorkers = async (request, response, next) => {
  const allWorkers = await userService.getAllWorkersService();

  const { workers, error } = allWorkers;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    workers,
  });
};

module.exports = {
  signUpUser,
  login,
  editUser,
  changeUserPass,
  forgotPassword,
  signUpWorker,
  editWorker,
  changeWorkerPass,
  forgotPasswordWorker,
  deleteUser,
  deleteWorker,
  getAllUsers,
  getAllWorkers,
};
