//creating the routes
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  home,
  uploadFile,
  getOneFile,
} = require("../controllers/index_controllers");

//setting up multer for file type check and for uploading file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", home);
router.post("/upload", upload.single("csv"), uploadFile);
router.get("/file/:name", getOneFile);

//exporting the routes
module.exports = router;
