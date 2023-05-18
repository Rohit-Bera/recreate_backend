const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const {
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
} = require("../controllers/feedback.controller");

//user routes
router.post("/postUserFeedback", auth, postuserFeedback);
router.get("/getUserFeedback", adminauth, getalluserFeedback);
router.delete("/deleteUserFeedback/:id", adminauth, deleteuserFeedback);

//Worker routes
router.post("/postWorkerFeedback", workerauth, postWorkerFeedback);
router.get("/getWorkerFeedback", adminauth, getallWorkerFeedback);
router.delete("/deleteWorkerFeedback/:id", adminauth, deleteWorkerFeedback);

// complaints

//user routes
router.post("/postUserComplaints", auth, postComplaintApi);
router.get("/getUserComplaints", auth, getComplaintAPi);
router.delete("/deleteUserComplaints/:id", auth, deleteComplaintApi);
// admin
router.get("/getUserComplaintsAdmin", adminauth, getComplaintAPi);
router.put("/userComplaintAdminReply/:id", adminauth, putComplaintApi);

//Worker routes
router.post("/postWorkerComplaints", workerauth, postComplaintApi);
router.get("/getWorkerComplaints", workerauth, getComplaintAPi);
router.delete("/deleteWorkerComplaints/:id", workerauth, deleteComplaintApi);
//admin
router.get("/getWorkerComplaintsAdmin", workerauth, getComplaintAPi);
router.put("/WorkerComplaintAdminReply/:id", adminauth, putComplaintApi);

module.exports = router;
