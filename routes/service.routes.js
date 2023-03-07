const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const adminauth = require("../middlewares/Adminauth");
const workerauth = require("../middlewares/workerAuth");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/servicesList");
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
  { name: "serviceImage", maxCount: 2 },
  { name: "launchedServiceImage", maxCount: 5 },
]);

const {
  getAllServices,
  placeService,
  searchByService,
} = require("../controllers/services.controller");

// admin
router.post("/placeService", auth, adminauth, documents, placeService);

// visitor
router.get("/getSearchService/:search", searchByService); // searched by anyone
router.get("/getAllservices", getAllServices);

module.exports = router;
