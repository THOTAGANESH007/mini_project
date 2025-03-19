require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server is running");
});
