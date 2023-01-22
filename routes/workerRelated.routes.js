const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerAuth = require("../middlewares/workerAuth");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/workerDocuments");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const documents = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "verificationDocument1", maxCount: 1 },
  { name: "verificationDocument2", maxCount: 1 },
  { name: "workImages", maxCount: 10 },
]);

const {
  uploadDocuments,
  editDocuments,
  getWorkerDocs,
  verifyDocs,
  getMyDocuments,
} = require("../controllers/workerRelated.controller");

// worker
router.post("/uploadDocuments", workerAuth, documents, uploadDocuments);
router.put("/editDocuments/:id", workerAuth, documents, editDocuments);
router.get("/getMyDocuments/:id", workerAuth, getMyDocuments);

// admin
router.get("/getWorkerDocs", auth, adminauth, getWorkerDocs);
router.put("/verifyDocs/:id", auth, adminauth, verifyDocs);

module.exports = router;
