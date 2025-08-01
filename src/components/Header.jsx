import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context,server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const Header = () => {

  const {isAuthenticated,setIsAuthenticated,isLoading,setLoading}=useContext(Context);
  //As there is no form,just a button there is no need of
  //preventDefault
  const logoutHandler=async()=>{
      setLoading(true);

        //as it is get request no data object and 
        // no headers=>just tell the type of data you are sending 

    try {
      const {data}=await axios.get(`${server}/users/logout`,{
          withCredentials:true,
        })
        setIsAuthenticated(false);
        toast.success("Logged Out Succesfully");
        setLoading(false);
    } catch (error) {
       setIsAuthenticated(true);
       toast.success(error.response.data.message);
       setLoading(false);
    }
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h2 className="text-2xl font-bold text-blue-600">Task Manger</h2>
      </div>
      <article className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
        >
          Profile
        </Link>
        {
          isAuthenticated ?  <button onClick={logoutHandler} disabled={isLoading}
                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 font-medium"
                                             >
                              Logout
                                      </button>

          :      <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Login
                </Link>                      
        }
      </article>
    </nav>
  );
};
