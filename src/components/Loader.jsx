import React from "react";

export const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
