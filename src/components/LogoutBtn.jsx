import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authservice } from '../config/auth'
import { useSelector ,useDispatch } from 'react-redux'
import { logout } from '../store/authslice';
import { showerr,hideError } from '../store/errorslice.js';
function LogoutBtn() {
  const userdata=useSelector(state=>state.auth.userdata);
  const navigate=useNavigate();
  const dispatch=useDispatch();
 async function Logoutt(){
      try {
         const remove=await authservice.logout();
       if(remove){
        dispatch(logout());
        navigate("/");
       }
      } catch (error) {
        dispatch(showerr("logout failed!"))
      }
  }
  return (
   
  <Link
    to="/"
    className="inline-block"
  >
    <button
      onClick={() => Logoutt()}
      className="px-6 py-2 bg-red-500 text-white rounded-lg text-lg
                 font-medium shadow-md 
                 hover:bg-red-600 active:scale-95 
                 transition duration-200"
    >
      Logout
    </button>
  </Link>
  )
}

export default LogoutBtn
