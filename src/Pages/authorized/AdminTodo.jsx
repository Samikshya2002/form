import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTodoTable from "../../components/AdminTodoTable";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const AdminTodo = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const [deleteTodo, setDeleteTodo] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/users");
        const filteredUsers = res.data.filter((user) => user.role !== "admin");
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5001/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const userTodos = todos.filter((todo) => todo.userEmail === selectedUser);

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5001/todos/${editTodo.id}`, {
        ...editTodo,
        text: editText,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editTodo.id ? { ...todo, text: editText } : todo))
      );
      setEditTodo(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const confirmDelete = (todo) => {
    setDeleteTodo(todo);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/todos/${deleteTodo.id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== deleteTodo.id));
      setDeleteTodo(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex w-full p-6">
        <div className="w-1/4 border-r p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.email)}
              className={`block w-full text-left p-2 mb-2 rounded ${
                selectedUser === user.email ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {user.first_name} {user.last_name}
            </button>
          ))}
        </div>
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-semibold mb-4">
            {selectedUser ? `Todos for ${selectedUser}` : "Select a user to view todos"}
          </h2>

          {selectedUser && (
            <AdminTodoTable
              todos={userTodos}
              handleEdit={handleEdit}
              handleDelete={confirmDelete}
            />
          )}
        </div>
      </div>
      {editTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditTodo(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteTodo}
        onCancel={() => setDeleteTodo(null)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default AdminTodo;
