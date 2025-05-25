import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/non-authorized/Signup";
import Signin from "./Pages/non-authorized/Signin";
import ToastContainer from "./components/Toastcontainer";
import Welcome from "./Pages/authorized/Welcome";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>   
  );
}

export default App;
