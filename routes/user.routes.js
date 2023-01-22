const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerAuth = require("../middlewares/workerAuth");

// controllers
const {
  signUpUser,
  login,
  editUser,
  forgotPassword,
  signUpWorker,
  editWorker,
  forgotPasswordWorker,
  deleteUser,
  deleteWorker,
  getAllUsers,
  getAllWorkers,
  changeUserPass,
  changeWorkerPass,
} = require("../controllers/user.controller");

// common routes
router.post("/login", login);

// routes of users
router.post("/signupUser", signUpUser);
router.put("/editUser/:id", auth, editUser);
router.put("/editPasswordUser/:id", auth, changeUserPass);
router.put("/forgotPasswordUser", auth, forgotPassword);

// routes for workers
router.post("/signupWorker", signUpWorker);
router.put("/editWorker/:id", editWorker);
router.put("/editPasswordWorker/:id", auth, changeWorkerPass);
router.put("/forgotPasswordWorker", workerAuth, forgotPasswordWorker);

// routes  of admin
router.delete("/deleteUser/:id", auth, adminauth, deleteUser);
router.delete("/deleteWorker/:id", auth, adminauth, deleteWorker);
router.get("/getAllUsers", auth, adminauth, getAllUsers);
router.get("/getAllWorkers", auth, adminauth, getAllWorkers);

module.exports = router;
