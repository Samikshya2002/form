import React, { useState, useEffect } from 'react';
import { UserCircle, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null); // 'admin', 'superadmin', or null
  const [userRole, setUserRole] = useState(null); // Track the signed-in user's role

  useEffect(() => {
    // Assuming you are storing user data like { email, role }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role); // Example roles: 'user', 'admin', 'superadmin'
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Define active style
  const activeStyle = 'text-blue-500 font-bold';

  return (
    <div className="min-h w-20 rounded-2xl bg-gray-100 text-black flex flex-col items-center py-6 space-y-10 shadow-lg relative">
      <div className="flex justify-center mb-1">
        <img
          src="/src/assets/Todo.png"
          alt="TODO Logo"
          className="h-10 w-10 object-contain"
        />
      </div>

      <div className="flex flex-col items-center space-y-8 mt-10 relative">
        {/* User */}
        <div
          onClick={() => navigate('/signup')}
          className={`flex flex-col items-center cursor-pointer ${userRole === 'user' ? activeStyle : ''}`}
        >
          <UserCircle className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
          <span className="text-xs mt-1">User</span>
        </div>

        {/* Admin Menu */}
        <div className="relative">
          <div
            onClick={() => toggleMenu('admin')}
            className={`flex flex-col items-center cursor-pointer ${userRole === 'admin' ? activeStyle : ''}`}
          >
            <ShieldCheck className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
            <span className="text-xs mt-1">Admin</span>
          </div>
          {openMenu === 'admin' && (
            <div className="absolute left-full top-0 ml-2 bg-white border rounded shadow-lg w-44 z-10">
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/admintodo')}
              >
                Users' Todos
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/todo')}
              >
                Add your Todo
              </div>
            </div>
          )}
        </div>

        {/* Super Admin Menu */}
        <div className="relative">
          <div
            onClick={() => toggleMenu('superadmin')}
            className={`flex flex-col items-center cursor-pointer ${userRole === 'superadmin' ? activeStyle : ''}`}
          >
            <Award className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
            <span className="text-xs mt-1 text-center">Super Admin</span>
          </div>
          {openMenu === 'superadmin' && (
            <div className="absolute left-full top-0 ml-2 bg-white border rounded shadow-lg w-44 z-10">
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/superadmin/view-users-todos')}
              >
                View Users' Todos
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/superadmin/add-todo')}
              >
                Add Own Todo
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
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
