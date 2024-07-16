const mongoose = require("mongoose");
const logger = require("../logger.js");
const { config } = require("../config.js");

const dbName = config.DBNAME;
const url = config.MONGODB_URI;
// const url = `mongodb://localhost:27017/${dbName}`;

async function connectDatabase() {
  await mongoose.connect(url, {
    // userNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  logger.debug("Connected successfully to MongoDB server");
}

module.exports = { connectDatabase };
