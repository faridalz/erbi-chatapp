import React, {useContext} from 'react'
import { AuthContext } from '../context';
import Login from './Login'
import Register from './Register'
import {Routes, Route} from "react-router-dom";
import {Home} from './Home'
import { Navbar } from './Navbar';




export const AllRoutes = () => {

  const {user} = useContext(AuthContext);

  const toggleIt = () => {
    document.getElementById("123").classList.toggle("active");
    document.getElementById("home").classList.toggle("activatedHome");
    document.getElementById("nav").classList.toggle("activatedNav");
    document.getElementById("root").classList.toggle("activatedRoot")
    document.getElementById("home").onclick = function(){
      document.getElementById("nav").classList.remove("activatedNav");
      document.getElementById("home").classList.remove("activatedHome");
      document.getElementById("123").classList.remove("active");
      document.getElementById("root").classList.remove("activatedRoot")
    }
  }

  return (
  <>
  {user ? (
    <Navbar toggleIt={toggleIt} />
  ) : null}
  
    <Routes>
            <Route path="/register" element={<Register />} />
            {user ? 
            <>
            (<Route path="/" element={<Home toggleIt={toggleIt} />} />) 
            </>
            : 
            <>
            (<Route path="/" element={<Login />} />)
            </>}
    </Routes>
  </>
    
  )
}
