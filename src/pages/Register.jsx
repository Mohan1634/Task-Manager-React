import React, { useContext, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from "axios";
import { Context, server } from '../main';
import toast from "react-hot-toast";

export const Register = () => {
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const {isAuthenticated,setIsAuthenticated,isLoading,setLoading}=useContext(Context);
   

  const submitHandler=async (e)=>{
    setLoading(true);
    //any button clicked will refresh remove that behaviour
     e.preventDefault();
     console.log(name,email,password);
     //In axios there is no need to convert 
     // json from server to js object 

     try {
       const {data}=await axios.post(`${server}/users/now`,
      {//data
      name,email,password
     },//set configuration
     {
      headers:{
       "Content-Type":"application/json"
      },//for cookie to pass
      withCredentials:true,
     })

     toast.success(data.message);
     setIsAuthenticated(true);
     setLoading(false);
     
     } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
     }
  }
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <section className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <form className="space-y-5" onSubmit={submitHandler}>
          <h2 className="text-3xl font-bold text-center text-blue-600">Sign Up</h2>
         {/* controlled input field */}
          <input
            required
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            required
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          <div className="text-center text-gray-500">OR</div>

          <Link
            to="/login"
            className="block text-center text-blue-600 hover:underline font-medium"
          >
            Log In
          </Link>
        </form>
      </section>
    </div>
  );
};
