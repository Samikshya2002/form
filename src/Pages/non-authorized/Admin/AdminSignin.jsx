import React, {useEffect} from "react";
import { useFormik } from "formik";
import { signInSchema } from '../../../validation/Signinschema';
import { InputField } from "/src/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToastContainer from "../../../components/Toastcontainer";

const AdminSignin = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/adminsignin", { replace: true }); 
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async(values) => {
      try {
    const res = await fetch(
      `http://localhost:5001/users?email=${values.email}&password=${values.password}`
    );
    const data = await res.json();

    if (data.length > 0) {
      const fakeToken = `token-${Math.random().toString(36).slice(2)}`;

      localStorage.setItem("user", JSON.stringify(data[0]));
      localStorage.setItem("token", fakeToken);

      toast.success("Sign in successful! 🚀");
      setTimeout(() => navigate("/welcome" , { replace: true }));
    } else {
      toast.error("Invalid email or password");
    }
  } catch (error) {
    toast.error("Login failed. Server error.");
    console.error("Signin error:", error);
  }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const formFields = [
    { id: "email", type: "email", name: "email", placeholder: "Email" },
    { id: "password", type: "password", name: "password", placeholder: "Password" },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={formik.handleSubmit} className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
    <h1 className="font-bold mb-4">Admin</h1>
    <h2 className="font-bold mb-4">Sign In</h2>
    {formFields.map((field) => (
      <InputField
        key={field.id}
        id={field.id}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={formik.values[field.name]}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        error={formik.errors[field.name]}
        touched={formik.touched[field.name]}
      />
    ))}
    <div className="mb-4">
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Sign In</button>
    </div>
    <p className="text-center text-sm text-gray-600">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign Up now</Link>
    </p>
    </form>
    </div>

  )
}

export default AdminSignin;