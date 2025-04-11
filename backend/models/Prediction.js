import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    prediction: { type: String, enum: ["real", "fake"], required: true },
    sessionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
