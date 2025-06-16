import React from 'react';
import { UserCircle, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };

  return (
    <div className="min-h w-20 rounded-2xl  bg-gray-100 text-black flex flex-col items-center py-6 space-y-10 shadow-lg">
      <div className="flex justify-center mb-1">
        <img
          src="/src/assets/Todo.png"
          alt="TODO Logo"
          className="h-10 w-10 object-contain"
        /></div>
      <div className="flex flex-col items-center space-y-8 mt-10">
        <div
          onClick={() => navigate('/todo')}
          className="flex flex-col items-center cursor-pointer "
        >
          <UserCircle className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
          <span className="text-xs mt-1">User</span>
        </div>

        <div
          onClick={() => navigate('/adminsignup')}
          className="flex flex-col items-center cursor-pointer "
        >
          <ShieldCheck className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
          <span className="text-xs mt-1">Admin</span>
        </div>

        <div
          onClick={() => navigate('/superadminsignup')}
          className="flex flex-col items-center cursor-pointer text-center"
        >
          <Award className="h-6 w-6 hover:scale-125 transition duration-100 transform" />
          <span className="text-xs mt-1">Super Admin</span>
        </div>
        <div>
            <button
                onClick={handleLogout}
                className=" top-6 sm:top-10 right-6 sm:right-10 bg-blue-500 hover:bg-blue-600 text-white px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-lg shadow text-sm sm:text-base"
            >Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
