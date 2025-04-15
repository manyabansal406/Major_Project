import { useState, useEffect } from "react";
import PredictForm from "../components/PredictForm";
import PredictionList from "../components/PredictionList";
import { Link } from "react-router-dom";

const Home = () => {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    let storedSession = localStorage.getItem("sessionId");
    if (!storedSession) {
      storedSession = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("sessionId", storedSession);
    }
    setSessionId(storedSession);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Transit Help</h1>
        <PredictForm sessionId={sessionId} />
      </div>

      <div className="w-full max-w-4xl mt-12">
        <PredictionList sessionId={sessionId} />
      </div>

      <div className="mt-8">
        <Link
          to="/admin"
          className="text-blue-600 hover:text-blue-800 underline font-semibold"
        >
          Admin Access
        </Link>
      </div>
    </div>
  );
};

export default Home;
