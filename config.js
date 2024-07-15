import dotenv from "dotenv";
import path from "path";

// Load environment variables from different .env files
dotenv.config({ path: path.resolve(".env") });
dotenv.config({ path: path.resolve(".env.local") });
dotenv.config({ path: path.resolve(".env.development.local") });

export const config = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};
