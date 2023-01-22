const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const {
  postFeedbackUser,
  postFeedbackVisitor,
  postFeedbackWorker,
  getFeedbackAdmin,
} = require("../controllers/feedback.controller");

router.post("/sysvisitorFeed", postFeedbackVisitor);
router.post("/sysuserFeed", auth, postFeedbackUser);
router.post("/sysworkerFeed", workerauth, postFeedbackWorker);
router.get("/sysadminFeed", auth, adminauth, getFeedbackAdmin);

module.exports = router;
