import PredictionList from "./PredictionList";
import Chart from "./Chart";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h2>
      <div className="w-full max-w-6xl">
        <Chart />
      </div>
      <div className="w-full max-w-6xl mt-8">
        <PredictionList isAdmin={true} />
      </div>
    </div>
  );
};

export default AdminDashboard;
