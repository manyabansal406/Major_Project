const ResultCard = ({ prediction }) => {
  const isReal = prediction === "real";

  return (
    <div className={`mt-6 p-6 rounded-xl shadow-lg ${isReal ? 'bg-green-100' : 'bg-red-100'} text-center`}>
      <h2 className="text-2xl font-bold">
        {isReal ? (
          <span className="text-green-700">✅ This job looks GENUINE!</span>
        ) : (
          <span className="text-red-700">⚠️ Warning: This job may be FAKE!</span>
        )}
      </h2>
    </div>
  );
};

export default ResultCard;
