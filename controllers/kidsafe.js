const {
  checkText,
  checkImage,
  checkVideo,
} = require("../helper/kidsafeChecker.js");
const logger = require("../logger.js");

exports.analyzeText = async (req, res) => {
  try {
    const incomingData = req.body;

    const text = incomingData.text;
    logger.info(`incoming_data=${text}`);
    if (!text) throw new Error("Invalid input");

    const response = await checkText(text);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
};

exports.analyzeImage = async (req, res) => {
  try {
    const incomingData = req.body;

    const imageUrl = incomingData.image_url;
    logger.info(`incoming_data=${imageUrl}`);
    if (!imageUrl) throw new Error("Invalid input");

    const response = await checkImage(imageUrl);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
};

exports.analyzeVideo = async (req, res) => {
  try {
    const incomingData = req.body;

    const videoUrl = incomingData.video_url;
    logger.info(`incoming_data=${videoUrl}`);
    if (!videoUrl) throw new Error("Invalid input");

    const response = await checkVideo(videoUrl);
    res.json(response);
  } catch (e) {
    logger.error("Inputs are invalid");
    res.status(400).json({ message: "failed", result: "Inputs are invalid" });
  }
};
