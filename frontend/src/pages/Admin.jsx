import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

const Admin = () => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {!authorized ? (
        <AdminLogin setAuthorized={setAuthorized} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Admin;
