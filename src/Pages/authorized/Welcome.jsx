import React from "react";

const Welcome = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">Welcome to Our Page!</h1>
        <p className="text-lg text-gray-700">We're glad to have you here.</p>
      </div>
    </div>
  );
};

export default Welcome;
