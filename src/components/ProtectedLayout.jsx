import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Navbar";

const ProtectedLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
