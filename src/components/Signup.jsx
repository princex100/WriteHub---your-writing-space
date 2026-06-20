import React from 'react'
import Input from './Input.jsx'
import { useForm } from 'react-hook-form'
import { authservice } from '../config/auth';
import { useDispatch } from 'react-redux';
import { logout, setoAuth, userlogin } from '../store/authslice';
import { useNavigate } from 'react-router-dom';
import gitlogo from "../assets/githubcat.svg"
import googlelogo from "../assets/google.svg"
import { oAuthservice } from '../config/Oauth.config.js';
import { configService } from '../config/config.js';
import { showerr } from '../store/errorslice';
function Signup() {
  const {register,handleSubmit}=useForm();
  const navigate=useNavigate();
  const dispatch=useDispatch();




  const submit=async(data)=>{
          try{
              const account=await authservice.createAccount({
                email:data.email,
                password:data.password,
                name:data.username,
                firsttimelogin:false
              })
              if(account){
               
                const user=await authservice.getAccount();
                
                if(user){
                  
                  await configService.setUserInfo({email:user.email,userId:user.$id,username:user.name,oauth:"none"})
                  dispatch(userlogin(user));
                  navigate("/");
                }
              }
              else{
                dispatch(logout())
                return
              }
          }
          catch (error) {
            dispatch(showerr(error?.message || "Signup failed. Try again."))
            dispatch(logout())
            return
          }
  }
  const googleLogin=()=>{
    try {
      dispatch(setoAuth("google"))
      
      oAuthservice.googlelogin()
     
    } catch {
       dispatch(logout())
       return
    }
  }
  const gitlogin=()=>{
    try {
      dispatch(setoAuth("github"))
      
      oAuthservice.githublogin();
     
      
    } catch {
       dispatch(logout())
       return
      
    }
  }
  return (
<div className="flex items-center justify-center flex-col px-4 mt-20 ">
  
   <form 
      onSubmit={handleSubmit(submit)} 
      action=""
      autoComplete="off"
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Account ✨
        </h1>
        <p className="text-sm text-gray-500">
          Start your blogging journey
        </p>
      </div>

      <Input
        type='text'
        placeholder="Enter email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition duration-200"
        {...register("email",{
          required:true
        })}
      />

      <Input
        type='text'
        placeholder="enter username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition duration-200"
        {...register("username",{
          required:true
        })}
      />

      <Input
        type='password'
        placeholder="Enter password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition duration-200"
        {...register("password",{
          required:true,
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        })}
      />

      <button 
        type='submit'
        className="w-full bg-green-600 text-white py-2 rounded-lg 
                   hover:bg-green-700 active:scale-95 
                   transition duration-200 font-medium"
      >
        Sign Up
      </button>


    </form>

  {/* NEW WRAPPER to match width */}
  <div className="w-full max-w-md mt-6">

    {/* Stylish Divider */}
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-[1px] bg-gray-300"></div>
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
        or sign in using
      </span>
      <div className="flex-1 h-[1px] bg-gray-300"></div>
    </div>

    <div className="flex flex-col gap-3 w-full mb-10">

      <button
        onClick={gitlogin}
        className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm"
      >
        <img height="24px" width="24px" src={gitlogo} alt="gitlogo" />
        <span className="text-sm font-medium text-gray-700">
          Continue with GitHub
        </span>
      </button>

      <button
        onClick={googleLogin}
        className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 active:scale-95 transition-all duration-200 shadow-sm"
      >
        <img height="24px" width="24px" src={googlelogo} alt="googlelogo" />
        <span className="text-sm font-medium text-gray-700">
          Continue with Google
        </span>
      </button>

    </div>
  </div>

</div>
)
}

export default Signup


