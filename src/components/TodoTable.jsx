import React from 'react';

const TodoTable = ({ todos, toggleComplete, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl text-center w-full max-w-full sm:max-w-2xl border border-gray-300 mx-2 sm:mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
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
                    <button onClick={() => handleEdit(index)} className="hover:scale-125 transition duration-100 transform">✏️</button>
                    <button onClick={() => handleDelete(index)} className="hover:scale-125 transition duration-100 transform">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;
