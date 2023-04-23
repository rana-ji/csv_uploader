//setting up multer for file storage
const multer = require("multer");
const path = require("path");

//defining the parameters and the destination folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//exporting the module
module.exports = upload;
