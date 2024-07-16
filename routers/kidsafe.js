const express = require("express");
const {
  analyzeText,
  analyzeImage,
  analyzeVideo,
} = require("../controllers/kidsafe.js");

const router = express.Router();

router.post("/text", analyzeText);

router.post("/image", analyzeImage);

router.post("/video", analyzeVideo);

router.get("/", (req, res) => {
  res.json({ message: "KidSafe Content Checker API" });
});

module.exports = router;
