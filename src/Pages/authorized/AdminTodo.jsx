import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navbar";
import axios from "axios";

const AdminTodo = () => {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Todo Management</h1>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Todo</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="border p-2">{todo.userEmail}</td>
                <td className="border p-2">{todo.task}</td>
                <td className="border p-2">{todo.status}</td>
                <td className="border p-2">
                  {/* You can add Edit, Delete buttons here */}
                  <button className="text-red-500 mr-2">Delete</button>
                  <button className="text-blue-500">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTodo;
