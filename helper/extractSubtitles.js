const { createClient } = require("@deepgram/sdk");
const fs = require("fs");
const { config } = require("../config.js");

// STEP 1: Create a Deepgram client using the API key
const deepgram = createClient(config.DEEPGRAM_API_KEY);

async function transcribeSubtitles(url) {
  let res = "";
  // STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    // path to the audio file
    fs.readFileSync(url),
    // STEP 3: Configure Deepgram options for audio analysis
    {
      model: "nova-2",
      smart_format: true,
    }
  );

  if (error) throw error;
  // STEP 4: Print the results
  if (!error) {
    if (result?.results?.channels?.[0]?.alternatives?.[0]?.transcript) {
      console.log(
        result?.results?.channels?.[0]?.alternatives?.[0]?.transcript
      );
      res = result?.results?.channels?.[0]?.alternatives?.[0]?.transcript;
    }
  }

  return res;
}

// transcribeSubtitles("./data/audio_01.mp3");

module.exports = { transcribeSubtitles };
