// 🔹 React
import React from 'react'

// 🔹 Routing
import { Link, useNavigate } from 'react-router-dom'

// 🔹 Auth service
import { authservice } from '../config/auth'

// 🔹 Redux
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authslice'

// 🔹 Error handling
import { showerr, hideError } from '../store/errorslice.js'

function LogoutBtn() {

  // 🔹 Get user data from redux (currently not used)
  const userdata = useSelector(state => state.auth.userdata)

  // 🔹 Navigation + dispatch hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 🔹 Logout handler
  async function Logoutt() {
    try {
      // Call logout API
      const remove = await authservice.logout()

      // If logout successful → clear redux + redirect
      if (remove) {
        dispatch(logout())
        navigate("/")
      }
    } catch (error) {
      // Handle logout failure
      dispatch(showerr("logout failed!"))
    }
  }

  return (

    // 🔹 Wrapper link (redirects to home)
    <Link
      to="/"
      className="inline-block"
    >
      {/* 🔹 Logout button */}
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