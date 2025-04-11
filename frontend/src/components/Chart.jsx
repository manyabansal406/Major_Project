import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Chart = () => {
  const [data, setData] = useState([
    { name: "Real", value: 0 },
    { name: "Fake", value: 0 },
  ]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/admin", {
          params: { password: import.meta.env.VITE_ADMIN_PASSWORD },
        });
        const real = response.data.filter((p) => p.prediction === "real").length;
        const fake = response.data.filter((p) => p.prediction === "fake").length;
        setData([
          { name: "Real", value: real },
          { name: "Fake", value: fake },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 10000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#00C49F", "#FF8042"]; // Green, Orange

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Real vs Fake Job Predictions
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
