import axios from "axios";
import { OpenAI } from "openai";
import { readYouTube } from "./read_youtube.js";
import { config } from "../config.js";
import logger from "../logger.js";

const client = new OpenAI({
  apiKey: config.OPENAI_API_KEY, // This is the default and can be omitted
});

const systemPrompt = 'Reply briefly to the following question: "Yes" or "No"';

const textQuestions = [
  {
    category: "educational",
    question: "Does this text include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this text include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this text include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this text include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this text include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this text include any controversial topics contents for kids?",
  },
];

const imageQuestions = [
  {
    category: "educational",
    question: "Does this image include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this image include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this image include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this image include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this image include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this image include any controversial topics contents for kids?",
  },
];

const videoQuestions = [
  {
    category: "educational",
    question: "Does this text include any educational contents for kids?",
  },
  {
    category: "entertainment",
    question: "Does this text include any entertainment contents for kids?",
  },
  {
    category: "nudity",
    question: "Does this text include any nudity contents for kids?",
  },
  {
    category: "sexuality",
    question: "Does this text include any sexuality contents for kids?",
  },
  {
    category: "religion",
    question: "Does this text include any religion contents for kids?",
  },
  {
    category: "controversial topics",
    question:
      "Does this text include any controversial topics contents for kids?",
  },
];

async function checkText(text) {
  if (!text) {
    return { message: "failed", result: "Inputs are invalid" };
  }

  const result = {
    educational: "No",
    entertainment: "No",
    nudity: "No",
    sexuality: "No",
    religion: "No",
    "controversial topics": "No",
  };

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

  const result = {
    educational: "No",
    entertainment: "No",
    nudity: "No",
    sexuality: "No",
    religion: "No",
    "controversial topics": "No",
  };

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

  const result = {
    educational: "No",
    entertainment: "No",
    nudity: "No",
    sexuality: "No",
    religion: "No",
    "controversial topics": "No",
  };

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

export { checkText, checkImage, checkVideo };
