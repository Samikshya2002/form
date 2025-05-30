import React from 'react'

const ToDo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-2xl w-full relative">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">TODO List</h1>
        <button className="absolute top-10 right-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          Logout
        </button>                 
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white mb-4 px-4 py-4 rounded">Add TODO</button>               
        <div className="bg-white p-10 rounded-2xl shadow-xl top-shadow text-center max-w-2xl w-full border-gray-300">
        <table className="w-full table-auto text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4">S.N</th>
            <th className="py-2 px-4">Todo</th>
            <th className="py-2 px-4 text-center">Edit</th>
            <th className="py-2 px-4 text-center">Delete</th>
          </tr>
        </thead>
        </table>
        </div>
      </div>
    </div>
  )
}

export default ToDo