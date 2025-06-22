import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminList from "../../components/AdminList";
import AddAdminModal from "../../components/AddAdminModal";
import EditTodoModal from "../../components/EditTodoModal";
import AdminTodoTable from "../../components/AdminTodoTable";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const SuperAdminTodo = () => {
  const [admins, setAdmins] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const [deleteTodo, setDeleteTodo] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ first_name: "", last_name: "", email: "", password: "" });

  useEffect(() => {
    const localAdmins = localStorage.getItem("admins");
    if (localAdmins) {
      setAdmins(JSON.parse(localAdmins));
    } else {
      const fetchAdmins = async () => {
        try {
          const res = await axios.get("http://localhost:5001/users");
          const adminUsers = res.data.filter((user) => user.role === "admin");
          setAdmins(adminUsers);
          localStorage.setItem("admins", JSON.stringify(adminUsers));
        } catch (error) {
          console.error("Error fetching admins:", error);
        }
      };
      fetchAdmins();
    }
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

  const adminTodos = todos.filter((todo) => todo.userEmail === selectedAdmin);

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5001/todos/${editTodo.id}`, { ...editTodo, text: editText });
      setTodos((prev) => prev.map((todo) => (todo.id === editTodo.id ? { ...todo, text: editText } : todo)));
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

  const handleAddAdmin = async () => {
    try {
      const adminData = { ...newAdmin, role: "admin" };
      const res = await axios.post("http://localhost:5001/users", adminData);
      setAdmins((prev) => {
        const updated = [...prev, res.data];
        localStorage.setItem("admins", JSON.stringify(updated));
        return updated;
      });
      setIsAddModalOpen(false);
      setNewAdmin({ first_name: "", last_name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleDeleteAdmin = async (adminEmail) => {
    try {
      const adminToDelete = admins.find((admin) => admin.email === adminEmail);
      if (adminToDelete) {
        await axios.delete(`http://localhost:5001/users/${adminToDelete.id}`);
        setAdmins((prev) => {
          const updated = prev.filter((admin) => admin.id !== adminToDelete.id);
          localStorage.setItem("admins", JSON.stringify(updated));
          return updated;
        });
        if (selectedAdmin === adminEmail) setSelectedAdmin(null);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex w-full p-6">
        <AdminList
          admins={admins}
          selectedAdmin={selectedAdmin}
          setSelectedAdmin={setSelectedAdmin}
          handleDeleteAdmin={handleDeleteAdmin}
          openAddModal={() => setIsAddModalOpen(true)}
        />

        <div className="w-3/4 p-4">
          <h2 className="text-xl font-semibold mb-4">
            {selectedAdmin ? `Todos for ${selectedAdmin}` : "Select an admin to view todos"}
          </h2>

          {selectedAdmin && (
            <AdminTodoTable todos={adminTodos} handleEdit={handleEdit} handleDelete={confirmDelete} />
          )}
        </div>
      </div>

      <EditTodoModal
        editTodo={editTodo}
        editText={editText}
        setEditText={setEditText}
        onClose={() => setEditTodo(null)}
        onSave={handleSaveEdit}
      />

      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAdmin}
        newAdmin={newAdmin}
        setNewAdmin={setNewAdmin}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTodo}
        onCancel={() => setDeleteTodo(null)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </div>
  );
};

export default SuperAdminTodo;
