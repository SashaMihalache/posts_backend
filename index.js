const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://admin:testtest@mongo:27017/?authSource=admin")
  .then(() => {
    console.log("Successfully connected to the Database.");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
