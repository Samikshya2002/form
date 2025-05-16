import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ id, type, name, placeholder, value, handleChange, handleBlur, error, touched }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block font-normal mb-1">
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
          className="border block p-2 mt-1 w-full rounded pr-10"
        />

        {/* Toggle Icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
