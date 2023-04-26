import React from 'react'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import "./App.css"


import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/profile";
import Navbar from "./components/navbar/Navbar"
import LeftBar from "./components/leftBar/LeftBar"
import RightBar from './components/rightBar/rightBar';




const App = () => {
  
  const currentUser = false;


const Layout=()=>{
  return(
    <div>
      <Navbar/>
      <div style={{display:"flex"}}>
      <LeftBar/>
      <div style={{flex:6}}>
      <Outlet/>
      </div>
      <RightBar/>
      </div>
    </div>
  );
};

  const ProtectedRoute = ({children})=>{
    if(!currentUser){ 
      return <Navigate to="/login"/>
    }
    return children
  } 

  const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Layout/></ProtectedRoute>,
        children:[
          {
            path:"/",
            element: <Home/>
          },
          {
            path:"/profile/:id",
            element: <Profile/>
          },
        ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    }
  ]);

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App
