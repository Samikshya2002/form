import React, { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { signUpSchema } from "../validation/Signupschema"; 
const AddAdminModal = ({ isOpen, onClose, onAdd, newAdmin, setNewAdmin }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({}); 
  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleAddClick = async () => {
    try {
      await signUpSchema.validate(newAdmin, { abortEarly: false });
      setErrors({});
      onAdd(); 
    } catch (validationError) {
      const formErrors = {};
      validationError.inner.forEach((err) => {
        formErrors[err.path] = err.message;
      });
      setErrors(formErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Admin</h2>

        {["first_name", "last_name", "email", "password"].map((field) => {
          const isPasswordField = field === "password";
          const inputType = isPasswordField
            ? isPasswordVisible
              ? "text"
              : "password"
            : field === "email"
            ? "email"
            : "text";

          return (
            <div key={field} className="relative mb-4">
              <input
                type={inputType}
                placeholder={field.replace("_", " ").toUpperCase()}
                value={newAdmin[field]}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, [field]: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {isPasswordField && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          );
        })}

        <div className="relative mb-4">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="CONFIRM PASSWORD"
            value={newAdmin.confirm_password || ""}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, confirm_password: e.target.value })
            }
            className={`w-full p-2 border rounded ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
