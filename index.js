//setting up the server
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//defining the port
const PORT = 5000;

const upload = require("./config/multer");

//getting the controllers
const {
  index,
  uploadCsv,
  getFile,
  search,
} = require("./controllers/index_controllers");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//defining templating engine
app.set("view engine", "ejs");
//setting up publicj directory
app.use(express.static(path.join(__dirname, "public")));

// setting up routes
app.get("/", index);
app.post("/upload", upload.single("csv"), uploadCsv);
app.get("/file/:name", getFile);
app.post("/search", search);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
