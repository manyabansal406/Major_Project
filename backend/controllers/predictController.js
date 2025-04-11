import axios from "axios";
import Prediction from "../models/Prediction.js";

export const predictJob = async (req, res) => {
  const { url } = req.body;

  try {
    // Fetch the job page content
    const response = await axios.get(url);
    const pageContent = response.data;

    // Send content to Python Model API
    const predictionResponse = await axios.post(
      process.env.PYTHON_MODEL_API_URL,
      { content: pageContent }
    );

    const prediction = predictionResponse.data.prediction;

    // Save to MongoDB
    const newPrediction = new Prediction({ url, prediction });
    await newPrediction.save();

    res.status(200).json({ prediction });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error predicting job authenticity" });
  }
};
