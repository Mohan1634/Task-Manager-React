import React from 'react';

export const TodoItem = ({ title, description, isCompleted,updateHandler,deleteHandler,id }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col gap-2 mb-4">
        <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            onChange={()=>{updateHandler(id)}}
            checked={isCompleted}
            className="w-4 h-4 accent-blue-600"
            readOnly
          />
          Completed
        </label>
        <button onClick={()=>{deleteHandler(id)}} className="text-white bg-red-600 border border-red-500 px-3 py-1 rounded-md text-sm transition">
          Delete
        </button>
      </div>
    </div>
  );
};
