const { OpenAI } = require("openai");
const { readYouTube } = require("./readYoutube.js");
const { config } = require("../config.js");
const logger = require("../logger.js");
const { Youtube } = require("../model/index");
const {
  systemPrompt,
  textQuestions,
  imageQuestions,
  videoQuestions,
} = require("../constants/prompt.js");

const client = new OpenAI({
  apiKey: config.OPENAI_API_KEY, // This is the default and can be omitted
});

const initialValue = {
  educational: "No",
  entertainment: "No",
  nudity: "No",
  sexuality: "No",
  religion: "No",
  "controversial topics": "No",
};

async function checkText(text) {
  if (!text) {
    return { message: "failed", result: "Inputs are invalid" };
  }

  let result = initialValue;

  try {
    for (const { category, question } of textQuestions) {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `${text}\n${question}` },
        ],
      });
      const answer = response.choices[0].message.content.trim();
      logger.debug(`response: ${category} = ${answer}`);

      if (answer.includes("Yes")) {
        result[category] = "Yes";
      }
    }
    return { message: "success", result };
  } catch (error) {
    logger.error(`An error occurred: ${error}`);
    return { message: "failed", result: "Could not analyze" };
  }
}

async function checkImage(imageUrl) {
  if (!imageUrl) {
    return { message: "failed", result: "Inputs are invalid" };
  }

  let result = initialValue;

  try {
    for (const { category, question } of imageQuestions) {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: JSON.stringify({
              type: "image_url",
              image_url: { url: imageUrl },
            }),
          },
          {
            role: "user",
            content: JSON.stringify({ type: "text", text: question }),
          },
        ],
      });
      const answer = response.choices[0].message.content.trim();
      logger.debug(`response: ${category} = ${answer}`);

      if (answer.includes("Yes")) {
        result[category] = "Yes";
      }
    }
    return { message: "success", result };
  } catch (error) {
    logger.error(`An error occurred: ${error}`);
    return { message: "failed", result: "Could not analyze" };
  }
}

async function checkVideo(videoUrl) {
  if (!videoUrl) {
    return { message: "failed", result: "Inputs are invalid" };
  }

  const text = await readYouTube(videoUrl);
  logger.debug(`extract text from video url: ${text}`);

  if (!text) {
    return { message: "failed", result: "Inputs are invalid" };
  }

  let result = initialValue;

  try {
    for (const { category, question } of textQuestions) {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `${text}\n${question}` },
        ],
      });
      const answer = response.choices[0].message.content.trim();
      logger.debug(`response: ${category} = ${answer}`);

      if (answer.includes("Yes")) {
        result[category] = "Yes";
      }
    }

    // save data into db
    const data = new Youtube({
      website_link: videoUrl,
      result: JSON.stringify(result),
    });
    await data.save();

    return { message: "success", result };
  } catch (error) {
    logger.error(`An error occurred: ${error}`);
    return { message: "failed", result: "Could not analyze" };
  }
}

module.exports = { checkText, checkImage, checkVideo };
