import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // If no user logged in, redirect to signin
      navigate("/signin", { replace: true });
      return;
    }
  }, [navigate]);

  const handleGetStarted = () => {
    const user = JSON.parse(localStorage.getItem("user"));

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
          Welcome to Our Page!
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
