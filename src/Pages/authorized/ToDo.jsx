import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodoModal from '/src/components/AddToDoModal.jsx';
import TodoTable from '../../components/TodoTable';


const ToDo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  const isFirstLoad = useRef(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email?.trim().toLowerCase(); 

  const TODOS_KEY = `todos_${userEmail}`;


  useEffect(() => {
  if (!userEmail) return;
  const storedTodos = localStorage.getItem(TODOS_KEY);
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
  }, [userEmail]);

  useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }
  if (!userEmail) return;
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos, userEmail]);


  const handleSave = (todoText) => {
    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex].text = todoText;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      const newTodo = {
        text: todoText,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    setShowModal(false);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg text-center max-w-2xl w-full relative mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-600">TODO List</h1>
        <button
          onClick={handleLogout}
          className="absolute top-6 sm:top-10 right-6 sm:right-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow text-sm sm:text-base"
        >
          Logout
        </button>
        <button
          onClick={() => {
            setEditingIndex(null); 
            setShowModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white mb-4 px-3 py-2 rounded text-sm sm:text-base"
        >
          Add TODO
        </button>

        {showModal && (
          <AddTodoModal
            onClose={() => {
              setShowModal(false);
              setEditingIndex(null);
            }}
            onSave={handleSave}
            initialText={editingIndex !== null ? todos[editingIndex].text : ''}
          />
        )}

        <TodoTable
          todos={todos}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ToDo;