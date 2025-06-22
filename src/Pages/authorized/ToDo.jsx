import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddTodoModal from "/src/components/AddToDoModal.jsx";
import TodoTable from "../../components/TodoTable";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const API_URL = "http://localhost:5001/todos";

const ToDo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const isFirstLoad = useRef(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email?.trim().toLowerCase();
  const TODOS_KEY = `todos_${userEmail}`;

  const loadTodos = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`${API_URL}?userEmail=${userEmail}`);
      const data = await res.json();
      setTodos(data);
      localStorage.setItem(TODOS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Load todos error:", error);
    }
  };

  useEffect(() => {
    if (!userEmail) return;
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    loadTodos();
  }, [userEmail]);

  const handleSave = async (todoText) => {
    if (!userEmail) return;

    if (editingIndex !== null) {
      const todoToEdit = todos[editingIndex];
      const updatedTodo = { ...todoToEdit, text: todoText };

      try {
        await fetch(`${API_URL}/${todoToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
        });
        await loadTodos();
        setEditingIndex(null);
      } catch (error) {
        console.error("Failed to update todo");
      }
    } else {
      const newTodo = {
        text: todoText,
        completed: false,
        userEmail: userEmail,
      };

      try {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        await loadTodos();
      } catch (error) {
        console.error("Failed to add todo");
      }
    }

    setShowModal(false);
  };

  const toggleComplete = async (index) => {
    const todoToUpdate = todos[index];
    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    try {
      await fetch(`${API_URL}/${todoToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      await loadTodos();
    } catch (error) {
      console.error("Failed to toggle todo");
    }
  };
  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = async () => {
    if (deleteIndex === null) return;

    const todoToDelete = todos[deleteIndex];
    try {
      await fetch(`${API_URL}/${todoToDelete.id}`, {
        method: "DELETE",
      });
      await loadTodos();
      setDeleteIndex(null);
    } catch (error) {
      console.error("Failed to delete todo");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg text-center max-w-2xl w-full relative mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-600">TODO List</h1>

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
            initialText={editingIndex !== null ? todos[editingIndex].text : ""}
          />
        )}

        <TodoTable
          todos={todos}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          handleDelete={confirmDelete} 
        />
      </div>

      <DeleteConfirmModal
        isOpen={deleteIndex !== null}
        onCancel={() => setDeleteIndex(null)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default ToDo;
