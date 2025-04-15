import { useState } from "react";
import axios from "axios";

const PredictForm = ({ sessionId }) => {
  const [url, setUrl] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setPrediction("");

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/predict", {
        url,
        sessionId,
      });
      setPrediction(response.data.prediction);
      setUrl("");
    } catch (error) {
      console.error(error);
      setPrediction("");
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl items-center">
        <input
          type="url"
          required
          placeholder="Enter the job posting URL"
          className="flex-grow p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-center"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-black-600 hover:bg-gray-200 text-green font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 font-semibold text-center">
          Prediction Failed. Please try again later.
        </div>
      )}

      {prediction && !error && (
        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="p-4 rounded-lg bg-white shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold">
              {prediction === "real" ? (
                <span className="text-green-600">Genuine Job</span>
              ) : prediction === "fake" ? (
                <span className="text-red-600">Fake Job</span>
              ) : (
                <span className="text-gray-500">Error</span>
              )}
            </h2>
          </div>

          
          <a
            href="https://unrivaled-cascaron-5648eb.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black-500 hover:bg-gray-200 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Give feedback
          </a>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
