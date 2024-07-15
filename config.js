const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from different .env files
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env.development.local") });
dotenv.config({ path: path.resolve(__dirname, "./.env") });
dotenv.config({ path: path.resolve(__dirname, "./.env.local") });
dotenv.config({ path: path.resolve(__dirname, "./.env.development.local") });

const config = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};

module.exports = config;
