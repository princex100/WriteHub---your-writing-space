import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCompleteForm,hideCompleteForm } from '../store/authslice.js'
import { useForm } from 'react-hook-form'
import { configService } from '../config/config.js'
import { data, useNavigate } from 'react-router-dom'
import { showerr } from '../store/errorslice.js'

function UserForm() {
  const dispatch=useDispatch()
  const hideform=()=>{
    dispatch(hideCompleteForm())}
    const [userr,setuser]=useState({})
    const navigate=useNavigate()
    
const userdata=useSelector(state=>state.auth.userdata)
    const submit=async(data)=>{
       try {
        console.log(2);
        
         if(data.email!==""){
            userr.email=data.email
       }
        if(data.phone!==""){
            userr.phone=data.phone

       }
        if(data.username!==""){
            userr.username=data.username
        
       }
        if(data.fullname!==""){
            userr.fullname=data.fullname
        
       }
        if(data.age!==""){
            userr.age=data.age
        
       }
        if(data.bio!==""){
            userr.bio=data.bio
        
       }
        if(data.gender!==""){
            userr.gender=data.gender
        
       }
       userr.userId=userdata.$id
        console.log(userr,"user");

        
         const res=await configService.updateuserInfo(userr)
         if(res){
          dispatch(hideCompleteForm())
          navigate("profile")
         }
       } catch (error) {
        console.log(1);
        
          dispatch(showerr("user didn't update.Try agiain."))
       }
      
    }
    useEffect(()=>{
      const getuser=async()=>{
        try {
       const user=await configService.getUserInfo(userdata.$id)
       console.log(user.rows[0].email);
       
       const obj={}
       if(user.rows[0].email!==""){
            obj.email=user.rows[0].email
       }
        if(user.rows[0].phone!==""){
            obj.phone=user.rows[0].phone

       }
        if(user.rows[0].username!==""){
            obj.username=user.rows[0].username
        
       }
        if(user.rows[0].fullname!==""){
            obj.fullname=user.rows[0].fullname
        
       }
        if(user.rows[0].age!==""){
            obj.age=user.rows[0].age
        
       }
        if(user.rows[0].bio!==""){
            obj.bio=user.rows[0].bio
        
       }
        if(user.rows[0].gender!==""){
            obj.bio=user.rows[0].gender
        
       }
       console.log(obj);
       
          setuser(obj)
        } catch (error) {
          throw new Error("user couldn't be fetched.")
        }
      }
      getuser()
    },[])
    const {watch,register,control,handleSubmit}=useForm({
      defaultValues:{
          email:userr.email ||"",
          phone:userr.phone||"",
          fullname:userr.fullname||"",
          username:userr.username||"",
          age:userr.age||"",
          bio:userr.bio||"",

       
      }
    })
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={hideform}
          className="absolute top-3 right-3 text-white text-lg hover:text-gray-300"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Update Profile
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4"
        >

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Full Name</label>
            <input
              {...register("fullname", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
            {/* {errors.fullname && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Enter username"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
            {/* {errors.username && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Age */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Age</label>
            <input
              {...register("age", { required: true })}
              type="number"
              placeholder="Enter age"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
            {/* {errors.age && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Gender</label>
            <select
              {...register("gender", { required: true })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-white/40"
            >
              <option value="">Select gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
            {/* {errors.gender && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Phone</label>
            <input
              {...register("phone", { required: true })}
              type="tel"
              placeholder="Enter phone"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
            {/* {errors.phone && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
            {/* {errors.email && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Bio</label>
            <textarea
              {...register("bio", { required: true })}
              rows="3"
              placeholder="Tell something about yourself..."
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40 resize-none"
            />
            {/* {errors.bio && <span className="text-red-400 text-xs">Required</span>} */}
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="mt-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
          >
            Update User
          </button>

        </form>
      </div>
    </div>
  )
}

export default UserForm
