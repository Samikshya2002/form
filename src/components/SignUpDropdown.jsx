import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SignUpDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        Sign Up <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className=" mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <ul className="py-1 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Admin</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Super Admin</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignUpDropdown;
