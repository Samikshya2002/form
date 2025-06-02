import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddTodoModal from '/src/components/AddTodoModal';

const ToDo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleSave = (newTodo) => {
    setTodos([...todos, newTodo]);
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-2xl w-full relative">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">TODO List</h1>
        <Link
          to="/signin"
          className="absolute top-10 right-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white mb-4 px-4 py-2 rounded"
        >
          Add TODO
        </button>

        {showModal && (
          <AddTodoModal onClose={() => setShowModal(false)} onSave={handleSave} />
        )}

        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl w-full border border-gray-300">
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4">S.N</th>
                <th className="py-2 px-4">Todo</th>
                <th className="py-2 px-4 text-center">Edit</th>
                <th className="py-2 px-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{todo}</td>
                  <td className="py-2 px-4 text-center">✏️</td>
                  <td className="py-2 px-4 text-center">🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
