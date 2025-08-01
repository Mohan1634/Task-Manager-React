import React, { useContext, useEffect, useState } from 'react'
import { Loader } from "../components/Loader"
import axios from 'axios';
import {Context, server} from "../main";
import toast from 'react-hot-toast';
import { TodoItem } from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

export const Home = () => {

 
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  //why Not use context because it is for user
  //we are doing this for task
  //In header there is logout we already used context api
  const [loading,setLoading]=useState(false);
  const [tasks,setTasks]=useState("");
  const [refresh,setRefresh]=useState(false);
  const {isAuthenticated}=useContext(Context);

  const updateHandler=async(id)=>{ 
    try {
      const {data}=await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true,
      })
      toast.success(data.message);
      setRefresh((prev)=>{return !prev})
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const deleteHandler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      })
      toast.success(data.message);
      setRefresh((prev)=>{return !prev})
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

    const submitHandler=async (e)=>{
      e.preventDefault();
    try {
      setLoading(true);
        const {data}=await axios.post(`${server}/task/new`,
        {
          title,
          description,
        },
        {
          headers:{
          "Content-Type":"application/json",
          },
          withCredentials:true,
        }
        )
        setTitle("");
        setDescription("");
        toast.success(data.message);
        setLoading(false);
        setRefresh((prev)=>{return !prev})
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  useEffect(()=>{
    const {data}= axios.get(`${server}/task/my`,{
      withCredentials:true,
    }).then((res)=>{
       setTasks(res.data.tasks);
    }).catch((e)=>{
      toast.error(e.response.data.message);
    })
    
  },[refresh])

   if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
  <div className="max-w-2xl mx-auto">
    {/* Add Task Form */}
    <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
      <form className="space-y-6" onSubmit={submitHandler}>
        <h2 className="text-3xl font-extrabold text-center text-blue-600">Add New Task</h2>

        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Task Title"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Enter Task Description"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-300 shadow-md"
        >
          Add Task
        </button>
      </form>
    </div>

    {/* Tasks List */}
    <section className="space-y-4">
      {tasks && tasks.length>0 ? (
        tasks.map((task, index) => (
          <TodoItem key={index} 
          title={task.title} 
          description={task.description}
          isCompleted={task.isCompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id={task._id}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </section>
  </div>
</div>

  )
}
