import React from 'react'import { Link, useNavigate } from 'react-router-dom'import { authservice } from '../config/auth'import { useDispatch } from 'react-redux'
import { logout } from '../store/authslice'import { showerr } from '../store/errorslice.js'

function LogoutBtn() {  const navigate = useNavigate()
  const dispatch = useDispatch()  async function Logoutt() {
    try {
      // Call logout API
      const remove = await authservice.logout()

      // If logout successful → clear redux + redirect
      if (remove) {
        dispatch(logout())
        navigate("/")
      }
    } catch {
      // Handle logout failure
      dispatch(showerr("logout failed!"))
    }
  }

  return (    <Link
      to="/"
      className="inline-block"
    >      <button
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