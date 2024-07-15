const express = require("express");
const router = express.Router();
const {
  checkText,
  checkImage,
  checkVideo,
} = require("../kidsafe_engine/engine");
const logger = require("../logger");

router.get("/", (req, res) => {
  res.json({ message: "KidSafe Content Checker API" });
});

router.post("/text", async (req, res) => {
  try {
    const incomingData = req.body;
    logger.info("incoming_data %s", incomingData);

    const text = incomingData.text;
    if (!text) throw new Error("Invalid input");

    const response = await checkText(text);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
});

router.post("/image", async (req, res) => {
  try {
    const incomingData = req.body;
    logger.info("incoming_data %s", incomingData);

    const imageUrl = incomingData.image_url;
    if (!imageUrl) throw new Error("Invalid input");

    const response = await checkImage(imageUrl);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
});

router.post("/video", async (req, res) => {
  try {
    const incomingData = req.body;
    logger.info("incoming_data %s", incomingData);

    const videoUrl = incomingData.video_url;
    if (!videoUrl) throw new Error("Invalid input");

    const response = await checkVideo(videoUrl);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
});

module.exports = { kidsafeRouter: router };
