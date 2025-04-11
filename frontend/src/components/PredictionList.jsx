import { useEffect, useState } from "react";
import axios from "axios";

const PredictionList = ({ sessionId, isAdmin = false }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const params = isAdmin
          ? { password: import.meta.env.VITE_ADMIN_PASSWORD }
          : { sessionId };

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/admin",
          { params }
        );
        setPredictions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 10000);
    return () => clearInterval(interval);
  }, [sessionId, isAdmin]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full overflow-x-auto">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">
        {isAdmin ? "All Predictions" : "Recent Checks"}
      </h3>
      <table className="min-w-full table-auto text-center text-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">URL</th>
            <th className="px-4 py-2">Prediction</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p) => (
            <tr key={p._id} className="border-t hover:bg-gray-100">
              <td className="px-2 py-2 break-words max-w-xs truncate" title={p.url}>
                {p.url}
              </td>
              <td className={`px-4 py-2 font-bold ${p.prediction === "real" ? "text-green-600" : "text-red-600"}`}>
                {p.prediction.toUpperCase()}
              </td>
              <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionList;
