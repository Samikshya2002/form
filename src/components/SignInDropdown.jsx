import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); 
  };


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
      >
        Sign In <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className=" mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <ul className="py-1 text-gray-700">
             <li 
             onClick={() => handleNavigation("/signin")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer">User</li>
            <li 
             onClick={() => handleNavigation("/adminsignin")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Admin</li>
            <li
            onClick={() => handleNavigation("/superadminsignin")} 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Super Admin</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignInDropdown;
