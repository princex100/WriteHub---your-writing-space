// 🔹 React & Hooks
import React, { useEffect, useRef, useState } from 'react'

// 🔹 Form handling
import { useForm } from 'react-hook-form'

// 🔹 Custom Input component
import Input from './Input'

// 🔹 Services (auth + oauth)
import { authservice } from '../config/auth'
import { oAuthservice } from '../config/Oauth.config'

// 🔹 Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  logout,
  removegithublogin,
  setgithublogin,
  setgooglelogin,
  userlogin,
  removegooglelogin,
  setoAuth
} from '../store/authslice'

// 🔹 Routing
import { replace, useNavigate, Link } from 'react-router-dom'

// 🔹 Assets
import gitlogo from "../assets/githubcat.svg"
import googlelogo from "../assets/google.svg"

// 🔹 Error handling
import { showerr, hideError } from '../store/errorslice.js'

function Login() {

  // 🔹 Redux + Navigation hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 🔹 Local state (currently unused but reserved)
  const [err, seterror] = useState("")

  // 🔹 React Hook Form setup
  const { register, handleSubmit } = useForm()

  // 🔹 Redux state (github login flag)
  const githubloginn = useSelector(state => state.auth.githublogin)

  // 🔹 Email/Password login handler
  const submit = async (data) => {
    try {
      // Preparing login payload
      const obj = {
        email: data.email,
        password: data.password,
        firsttimelogin: true
      }

      // Calling login API
      const session = await authservice.login(obj)

      // Clearing input values manually
      data.email = ""
      data.password = ""

      // If login successful → fetch user
      if (session) {
        const user = await authservice.getAccount()

        // If user exists → store in redux + redirect
        if (user) {
          dispatch(userlogin(user))
          navigate("/", { replace: true })
        }
      }
    }
    catch (err) {
      // Reset OAuth states if normal login fails
      dispatch(removegithublogin())
      dispatch(removegooglelogin())

      // Show error message
      dispatch(showerr(err.message))
      return
    }
  }

  // 🔹 Google OAuth login
  const googleLogin = async () => {
    try {
      // Set redux flags for OAuth tracking
      dispatch(setgooglelogin())
      dispatch(setoAuth("google"))

      // Trigger OAuth flow
      oAuthservice.googlelogin()
    }
    catch (error) {
      // Handle failure
      dispatch(showerr("google login failed.Try again."))
      dispatch(logout())
      return
    }
  }

  // 🔹 GitHub OAuth login
  const gitlogin = async () => {
    try {
      // Set redux flags for OAuth tracking
      dispatch(setgithublogin())
      dispatch(setoAuth("github"))

      // Trigger OAuth flow
      const res = oAuthservice.githublogin()
    }
    catch (error) {
      // Handle failure
      dispatch(showerr("github login failed.Try again."))
      dispatch(logout())
      return
    }
  }

  return (
    <div className="flex items-center justify-center px-4 flex-col">

      {/* 🔹 Login Form */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >

        {/* 🔹 Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>

          {/* 🔹 Navigate to Signup */}
          <Link
            to="/SignUp"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>

        {/* 🔹 Email Input */}
        <Input
          type='text'
          autoComplete="off"
          placeholder="Enter email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition duration-200"
          {...register("email", {
            required: true,
            value: ""
          })}
        />

        {/* 🔹 Password Input */}
        <Input
          type='password'
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition duration-200"
          {...register("password", {
            required: true
          })}
        />

        {/* 🔹 Submit Button */}
        <button
          type='submit'
          className="w-full bg-blue-600 text-white py-2 rounded-lg 
                     hover:bg-blue-700 active:scale-95 
                     transition duration-200 font-medium"
        >
          Login
        </button>

      </form>

      {/* 🔹 OAuth Buttons Section */}
      <div className="w-full max-w-md mb-10 mt-4">

        <div className="flex flex-col gap-3 w-full">

          {/* 🔹 GitHub Login */}
          <button
            onClick={gitlogin}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <img height="24px" width="24px" src={gitlogo} alt="gitlogo" />
            <span className="text-sm font-medium text-gray-700">
              login with GitHub
            </span>
          </button>

          {/* 🔹 Google Login */}
          <button
            onClick={googleLogin}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <img height="24px" width="24px" src={googlelogo} alt="googlelogo" />
            <span className="text-sm font-medium text-gray-700">
              login with Google
            </span>
          </button>

        </div>
      </div>

    </div>
  )
}

export default Login