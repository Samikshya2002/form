import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from '../../../validation/Signupschema';
import { InputField } from "/src/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUpDropdown from "../../../components/SignUpDropdown";
import ToastContainer from "../../../components/Toastcontainer";


const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async(values) => {
      try {
    const res = await fetch("http://localhost:5001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        role: "user",
      }),
    });

    if (res.ok) {
      toast.success("Signup successful! 🎉");
      setTimeout(() => navigate("/signin"));
    } else {
      toast.error("Signup failed. Try again.");
    }
  } catch (error) {
    toast.error("Server error. Please try later.");
    console.error("Signup error:", error);
  }
    },
  validateOnChange: true,
  validateOnBlur: true,
  });

  const formFields = [
    { id: "first_name", type: "text", name: "first_name", placeholder: "First Name" },
    { id: "last_name", type: "text", name: "last_name", placeholder: "Last Name" },
    { id: "email", type: "email", name: "email", placeholder: "Email" },
    { id: "password", type: "password", name: "password", placeholder: "Password" },
    { id: "confirm_password", type: "password", name: "confirm_password", placeholder: "Confirm Password" },
  ];

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto shadow-md rounded overflow-hidden border mt-32">
      <form onSubmit={formik.handleSubmit} className="border w-full md:w-2/3 p-6 shadow-md">
        <h1 className="font-bold mb-4">Sign Up</h1>
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
        <div><SignUpDropdown/></div>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/signin" className="text-blue-600 hover:underline font-medium">Sign In now</Link>
        </p>
      </form>
      
      <div className="hidden md:block w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1000&q=80"
          alt="Laptop on clean workspace"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
   
  );
};

export default Signup;