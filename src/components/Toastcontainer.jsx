// src/components/Toastcontainer.jsx
import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastcontainer = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={true}
    closeOnClick={false}
    pauseOnHover={true}
    draggable={true}
    progress={undefined}
    theme="light"
    transition={Bounce}
    limit={1}  
  />
);

export default Toastcontainer;
