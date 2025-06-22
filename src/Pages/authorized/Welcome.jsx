import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/signin", { replace: true });
    return null;
  }

  const handleGetStarted = () => {
    if (user?.role === "admin") {
      navigate("/admintodo");
    } else if (user?.role === "superadmin") {
      navigate("/superadmintodo");
    } else {
      navigate("/todo");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">
          Welcome to Our Page, {user?.first_name}!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We're glad to have you here.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
