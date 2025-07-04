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
import ToDo from "./Pages/authorized/ToDo";
import AdminTodo from "./Pages/authorized/AdminTodo";
import SuperAdminTodo from "./Pages/authorized/SuperAdminTodo";
import PageNotFound from "./Pages/non-authorized/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/superadminsignup" element={<SuperAdminSignup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/superadminsignin" element={<SuperAdminSignin />} />

          <Route
            path="/welcome"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
                <Welcome />
              </ProtectedRoute>
            }
          />

          <Route element={<ProtectedLayout />}>
            <Route
              path="/todo"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <ToDo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admintodo"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminTodo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmintodo"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperAdminTodo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
