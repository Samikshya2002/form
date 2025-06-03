import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AddTodoModal from '/src/components/AddToDoModal.jsx';

const ToDo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const isFirstLoad = useRef(true); 

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    console.log('Loaded todos from localStorage:', storedTodos);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    console.log('Saving todos to localStorage:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSave = (newTodoText) => {
    const newTodo = {
      text: newTodoText,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setShowModal(false);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
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
            <thead className="bg-gray-100  text-gray-700">
              <tr>
                <th className="py-2 px-4">S.N</th>
                <th className="py-2 px-4">Todo</th>
                <th className="py-2 px-4 text-center">Options</th>
              </tr>
            </thead>
           <tbody>
              {todos.map((todo, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(index)}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                      {todo.text}
                    </span>
                  </td>
                   <td className="py-2 px-4 text-center">
                    <div className="inline-flex items-center space-x-6">
                      <button className="hover:scale-125 transition duration-100 transform">✏️</button>
                      <button className="hover:scale-125 transition duration-100 transform">🗑️</button>
                    </div>
                  </td>
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
