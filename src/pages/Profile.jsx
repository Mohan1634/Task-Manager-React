import React, { useContext } from 'react';
import { Context } from '../main';
import { Loader } from '../components/Loader';
import { Navigate } from 'react-router-dom';

export const Profile = () => {
  const { isAuthenticated, isLoading, user } = useContext(Context);
  if(!isAuthenticated) return <Navigate to={"/login"}/>
  if (isLoading || !user?.name || !user?.email) return <Loader />;

  return (


    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-inner">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">UserName : {user?.name}</h2>
          <p className="text-gray-500 text-sm">Email : {user?.email}</p>

          <div className="mt-6 w-full border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Welcome to your profile dashboard. Manage your info, privacy, and security all in one place.
            </p>

            <button className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    )
};
