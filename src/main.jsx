import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createContext} from "react";

import App from './App.jsx';

export const server="https://task-manager-ya7i.onrender.com/api/v1"

export const Context=createContext({isAuthenticated: false});

const AppWrapper=(props)=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [isloading,setIsLoading]=useState(false);
  const [user,setUser]=useState({});


  return <Context.Provider value={{
    isAuthenticated,setIsAuthenticated,isloading,setIsLoading,user,setUser}}>
    <App/>
  </Context.Provider>
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
