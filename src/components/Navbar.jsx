import React, { useState, useEffect, useRef } from 'react';
import { UserCircle, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };

  const toggleMenu = (menu) => {
    if (isMenuAccessible(menu)) {
      setOpenMenu(openMenu === menu ? null : menu);
    }
  };

  // Only allow opening own menu
  const isMenuAccessible = (menu) => userRole === menu;

  const navigateIfAllowed = (path) => {
    if (path && path !== '#') {
      navigate(path);
    }
  };

  const activeStyle = 'text-blue-500 font-bold';
  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return (
    <div className="min-h w-20 rounded-2xl bg-gray-100 text-black flex flex-col items-center py-6 space-y-10 shadow-lg relative">
      <div className="flex justify-center mb-1">
        <img
          src="/src/assets/Todo.png"
          alt="TODO Logo"
          className="h-10 w-10 object-contain"
        />
      </div>

      <div ref={dropdownRef} className="flex flex-col items-center space-y-8 mt-10 relative">

        {/* User Menu */}
        <div
          onClick={() => toggleMenu('user')}
          className={`flex flex-col items-center cursor-pointer ${userRole === 'user' ? activeStyle : ''} ${!isMenuAccessible('user') ? disabledStyle : ''}`}
        >
          <UserCircle className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
          <span className="text-xs mt-1">User</span>
        </div>

        {openMenu === 'user' && isMenuAccessible('user') && (
          <div className="absolute left-full top-0 ml-2 bg-white border rounded shadow-lg w-44 z-10">
            <div
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigateIfAllowed('/todo')}
            >
              Your Todo
            </div>
          </div>
        )}

        {/* Admin Menu */}
        <div className="relative">
          <div
            onClick={() => toggleMenu('admin')}
            className={`flex flex-col items-center cursor-pointer ${userRole === 'admin' ? activeStyle : ''} ${!isMenuAccessible('admin') ? disabledStyle : ''}`}
          >
            <ShieldCheck className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
            <span className="text-xs mt-1">Admin</span>
          </div>

          {openMenu === 'admin' && isMenuAccessible('admin') && (
            <div className="absolute left-full top-0 ml-2 bg-white border rounded shadow-lg w-44 z-10">
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigateIfAllowed('/admintodo')}
              >
                Users' Todos
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigateIfAllowed('/todo')}
              >
                Your Todo
              </div>
            </div>
          )}
        </div>

        {/* Super Admin Menu */}
        <div className="relative">
          <div
            onClick={() => toggleMenu('superadmin')}
            className={`flex flex-col items-center cursor-pointer ${userRole === 'superadmin' ? activeStyle : ''} ${!isMenuAccessible('superadmin') ? disabledStyle : ''}`}
          >
            <Award className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
            <span className="text-xs mt-1 text-center">Super Admin</span>
          </div>

          {openMenu === 'superadmin' && isMenuAccessible('superadmin') && (
            <div className="absolute left-full top-0 ml-2 bg-white border rounded shadow-lg w-44 z-10">
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigateIfAllowed('/admintodo')}
              >
                Users' Todos
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigateIfAllowed('/superadmintodo')}
              >
                Admins' Todos
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigateIfAllowed('/todo')}
              >
                Your Todo
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="top-6 sm:top-10 right-6 sm:right-10 bg-blue-500 hover:bg-blue-600 text-white px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg shadow text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
