import express from "express";
import axios from "axios";

//cheerio is for webscraping
import * as cheerio from "cheerio";

import https from "https";
import Prediction from "../models/Prediction.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url, sessionId } = req.body;

  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(url, { httpsAgent: agent });
    const html = response.data;
    const $ = cheerio.load(html);

    // Extracting texts 
    const jobText = $("h1, h2, p, div").text();

    const cleanedJobText = jobText.toLowerCase();

    //console.log(jobText);

    if (!jobText) {
      throw new Error("Not enough job content found for prediction.");
    }

    let prediction = "fake"; // Default fallback as fake

    try {
      const predictResponse = await axios.post(process.env.PYTHON_MODEL_API_URL, {
        content: jobText,
      });

      console.log(predictResponse.data);
      console.log(predictResponse.data.prediction);

      if (
      

        predictResponse.data &&
        (predictResponse.data.prediction === 'real' ||
          predictResponse.data.prediction === 'fake')
      ) {
        console.log("fdsfsfsfsfsd")
        prediction = predictResponse.data.prediction;
      }
    } catch (error) {
      console.error("Python model error, falling back to fake prediction.");
    }

    // Always save prediction
    await new Prediction({ url, prediction, sessionId }).save();

    res.json({ prediction });
  } catch (error) {
    console.error("Prediction Error:", error.message);
    res.status(500).json({ message: "Prediction failed", error: error.message });
  }
});

export default router;
