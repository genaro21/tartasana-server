const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.database.url)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));
