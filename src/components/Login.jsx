import React from 'react'import { useForm } from 'react-hook-form'import Input from './Input'import { authservice } from '../config/auth'
import { oAuthservice } from '../config/Oauth.config'import { useDispatch } from 'react-redux'
import {
  logout,
  removegithublogin,
  setgithublogin,
  setgooglelogin,
  userlogin,
  removegooglelogin,
  setoAuth
} from '../store/authslice'import { useNavigate, Link } from 'react-router-dom'import gitlogo from "../assets/githubcat.svg"
import googlelogo from "../assets/google.svg"import { showerr } from '../store/errorslice.js'

function Login() {  const dispatch = useDispatch()
  const navigate = useNavigate()  const { register, handleSubmit } = useForm()  const submit = async (data) => {
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
  }  const googleLogin = async () => {
    try {
      // Set redux flags for OAuth tracking
      dispatch(setgooglelogin())
      dispatch(setoAuth("google"))

      // Trigger OAuth flow
      oAuthservice.googlelogin()
    }
    catch {
      // Handle failure
      dispatch(showerr("google login failed.Try again."))
      dispatch(logout())
      return
    }
  }  const gitlogin = async () => {
    try {
      // Set redux flags for OAuth tracking
      dispatch(setgithublogin())
      dispatch(setoAuth("github"))

      // Trigger OAuth flow
      oAuthservice.githublogin()
    }
    catch {
      // Handle failure
      dispatch(showerr("github login failed.Try again."))
      dispatch(logout())
      return
    }
  }

  return (
    <div className="flex items-center justify-center px-4 flex-col">      <form
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>          <Link
            to="/SignUp"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>        <Input
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
        />        <Input
          type='password'
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition duration-200"
          {...register("password", {
            required: true
          })}
        />        <button
          type='submit'
          className="w-full bg-blue-600 text-white py-2 rounded-lg 
                     hover:bg-blue-700 active:scale-95 
                     transition duration-200 font-medium"
        >
          Login
        </button>

      </form>      <div className="w-full max-w-md mb-10 mt-4">

        <div className="flex flex-col gap-3 w-full">          <button
            onClick={gitlogin}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <img height="24px" width="24px" src={gitlogo} alt="gitlogo" />
            <span className="text-sm font-medium text-gray-700">
              login with GitHub
            </span>
          </button>          <button
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