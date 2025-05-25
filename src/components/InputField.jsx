import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  id,
  type,
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">
        {placeholder}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className={`border p-2 w-full rounded pr-10 ${
            touched && error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {touched && error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
