//creating the controllers for csv
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

let csvData = [];

//getting all uploaded csv
const index = (req, res) => {
  const files = fs.readdirSync("./uploads/");
  res.render("index", { files });
};

//uploading csv
const uploadCsv = (req, res) => {
  const file = req.file;
  fs.createReadStream(`./uploads/${file.filename}`)
    .pipe(csv())
    .on("data", (row) => {
      csvData.push(row);
    })
    .on("end", () => {
      res.redirect("/");
    });
};

//getting single csv and data of that csv
const getFile = (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(__dirname, "../uploads/", fileName);
  const data = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      let sortedData = data;
      const sortColumn = req.query.sortBy;
      const sortOrder = req.query.order;
      if (sortColumn) {
        sortedData = data.sort((a, b) => {
          let comparison = 0;
          if (a[sortColumn] > b[sortColumn]) {
            comparison = 1;
          } else if (a[sortColumn] < b[sortColumn]) {
            comparison = -1;
          }
          return comparison;
        });
        if (sortOrder === "desc") {
          sortedData.reverse();
        }
      }
      csvData = data;
      res.render("file", { data: sortedData, sortColumn, sortOrder });
    });
};

//seacrch functionality
const search = (req, res) => {
  const searchTerm = req.body.search;
  const results = csvData.filter((row) => {
    for (const columnName in row) {
      if (row[columnName].toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  res.render("search", { results });
};

//exporting all the functions
module.exports = {
  index,
  uploadCsv,
  getFile,
  search,
};
