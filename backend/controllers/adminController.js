// import Prediction from "../models/Prediction.js";

// export const getAllPredictions = async (req, res) => {
//   const { password } = req.query;

//   if (password !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const predictions = await Prediction.find().sort({ createdAt: -1 });
//     res.status(200).json(predictions);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching predictions" });
//   }
// };
