import express from "express";
import Prediction from "../models/Prediction.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { password, sessionId } = req.query;

  if (password) {
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const predictions = await Prediction.find().sort({ createdAt: -1 }).maxTimeMS(60000);
      res.json(predictions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fetching predictions failed.", error: error.message });
    }
  } else if (sessionId) {
    try {
      const predictions = await Prediction.find({ sessionId }).sort({ createdAt: -1 }).maxTimeMS(60000);
      res.json(predictions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Fetching user predictions failed.", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Missing parameters" });
  }
});

export default router;
