import React from "react";
import { ToastContainer, Slide } from "react-toastify";


const Toastcontainer = () => (
  <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={true}
    closeOnClick={true}
    pauseOnHover={false}
    draggable={true}
    progress={undefined}
    theme="colored"
    transition={Slide}
    limit={1}  
  />
);

export default Toastcontainer;
