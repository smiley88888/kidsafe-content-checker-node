import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { kidsafeRouter } from "./routers/kidsafe_api.js";
import logger from "./logger.js";

const app = express();
const port = 8000;
const IP_address = "0.0.0.0";

// Logging
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Replace with specific origins if needed
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Add routers to app
app.use("/api/kidsafe", kidsafeRouter);

// Custom error handler for validation errors
app.use((err, req, res, next) => {
  if (err.status === 422) {
    const excStr = `${err.message}`.replace("\n", " ").replace(/ {3}/g, " ");
    console.error(`${req.method} ${req.url}: ${excStr}`);
    res.status(422).json({
      status_code: 10422,
      message: excStr,
      data: null,
    });
  } else {
    next(err);
  }
});

// Start server
app.listen(port, IP_address, () => {
  logger.info("----- start kidsafe content checker service -----");
  logger.info(`Server is running on http://${IP_address}:${port}`);
});
