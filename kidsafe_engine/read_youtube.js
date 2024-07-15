import { google } from "googleapis";
import { config } from "../config.js";

const youtube = google.youtube({
  version: "v3",
  auth: config.GOOGLE_API_KEY,
});

async function readYouTube(url) {
  const videoId = url.split("v=")[1];
  const response = await youtube.videos.list({
    part: "snippet,statistics",
    id: videoId,
  });
  const video = response.data.items[0];
  const title = video.snippet.title;
  const description = video.snippet.description;

  console.log("Title:", title);
  console.log("Description:", description);
  return `${title}\n${description}`;
}

export { readYouTube };
