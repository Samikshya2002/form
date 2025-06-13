import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/non-authorized/User/Signup";
import AdminSignup from "./Pages/non-authorized/Admin/AdminSignup";
import SuperAdminSignup from "./Pages/non-authorized/Superadmin/SuperAdminSignup";
import Signin from "./Pages/non-authorized/User/Signin";
import AdminSignin from "./Pages/non-authorized/Admin/AdminSignin";
import SuperAdminSignin from "./Pages/non-authorized/Superadmin/SuperAdminSignin";
import ToastContainer from "./components/Toastcontainer";
import Welcome from "./Pages/authorized/Welcome";
import ToDo from "./Pages/authorized/ToDo"
import PageNotFound from "./Pages/non-authorized/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute"; 


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/signup" element={<SuperAdminSignup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/adminsignin" element={<AdminSignin /> }/>
          <Route path="/superadminsignin" element={ <SuperAdminSignin />}/>
          <Route path = "/todo" element = {<ProtectedRoute><Welcome /></ProtectedRoute>}/>
          <Route path = "/todo" element = {<ProtectedRoute><ToDo /></ProtectedRoute>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
