const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
  website_link: String,
  result: String,
  timestamp: { type: Date, default: Date.now },
  mark: { type: String, default: `no` },
});

module.exports = mongoose.model("youtube", youtubeSchema);
