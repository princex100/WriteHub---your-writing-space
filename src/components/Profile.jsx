import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn.jsx'
import { removegithublogin, removegooglelogin, showCompleteForm, setavt } from '../store/authslice.js'
import { configService } from '../config/config.js'
import { showerr } from '../store/errorslice.js'
import { useLocation } from 'react-router-dom'
function Profile() {
  
const userdata=useSelector(state=>state.auth.userdata)
const [user,setuser]=useState({})
const [loader,setloader]=useState(false)
const [avatar,setavatar]=useState(false)
const [image,setimage]=useState("")
const [initial,setinitial]=useState(false)
const githublogin=useSelector(state=>state.auth.githublogin)
const googleLogin=useSelector(state=>state.auth.googleLogin)
     const dispatch=useDispatch()
     
     const fields=[
      {label:"username",
        value:user.username||"",
        placeholder:" set your username"

      },
      {label:"fullname",
        value:user.fullname||"",
        placeholder:" set your fullname"

      },
      {label:"email",
        value:user.email||"",
        placeholder:" set your email"

      },
       {label:"phone",
        value:user.phone||"",
        placeholder:" set your phone"

      },
       {label:"age",
        value:user.age||"",
        placeholder:" set your age"

      },
       {label:"gender",
        value:user.gender||"",
        placeholder:" set your gender"

      },
       {label:"bio",
        value:user.bio||"",
        placeholder:" set your bio"

      }
     ]

    //  showimage()
const handleImageChange=async(e)=>{
setloader(true)

   dispatch(setavt())

   const image = e.target.files?.[0]
if(!image) return
   

  try {
   const url= await configService.getAvatarUrl(userdata.$id)
   if(url.rows.length!==0){
    
  
    
     const avatarUrl=await configService.uploadFile(image)
     await configService.updateAvatar(url.rows[0].$id,avatarUrl.$id)
     const img=configService.getfileview(avatarUrl.$id)
   setimage(img)

   }
   else{
     const avatarUrl=await configService.uploadFile(image)
     await configService.createAvatar(userdata.$id,avatarUrl.$id)
   const img=configService.getfileview(avatarUrl.$id)
   setimage(img)


   }
setinitial(false)

   setloader(false)

 


  } catch {
    setloader(false)
    dispatch(showerr("profile picture didn't upload!"))
  }
   
}
const location=useLocation()
useEffect(()=>{
  const getuser=async()=>{
    try {
      if(!githublogin&&!googleLogin&&!userdata){
        dispatch(showerr("user not logged in."))
        return

      }
 
        dispatch(removegithublogin())
        dispatch(removegooglelogin())
      const userr=await configService.getUserInfo(userdata.$id)
      
       
        setuser(userr.rows[0]);
      
    } catch {
      if(!user){
        dispatch(showerr("user couldn't be fetched. Try againnnnn."))
      }
      return
    }
  }
  
   getuser()
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[location.pathname])

useEffect(()=>{
const getavatar=async(id)=>{
    
try {

setinitial(false)
   const url= await configService.getAvatarUrl(id)
   
    const img = url?.rows?.[0]
  ? configService.getfileview(url.rows[0].avatar)
  : ""
   setimage(img)
   setavatar(!avatar)
   setinitial(false)
   return true
  } catch {
    setinitial(true)
    return false
  }
  }
    
    getavatar(userdata.$id).then(res => {
  if(res === false){
    setinitial(true)
  } else {
    setinitial(false)
  }
})
    

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[location.pathname])
const showform=()=>{
  dispatch(showCompleteForm())
}
    
     const initials=()=>{

 
  const arr = userdata?.name?.split(" ") || []
 let initial="";
 arr.forEach(e=>initial=initial.concat(e.charAt(0).toUpperCase()))
 
 return initial
}
  return (
   <div className="min-h-screen bg-white px-6 py-10"   style={{
    background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
  }}>
      <div className="max-w-md mx-auto flex flex-col gap-8">
 
        {/* ── Avatar + name block ── */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="flex flex-col items-center gap-3 pt-4">
      
      <div className="relative w-20 h-20">
        
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-500 ring-4 ring-indigo-50 overflow-hidden">
          
          {image!==""&&!initial && (
            <img
              src={image}
              alt="profile"
              
              className="w-full h-full object-cover"
            />
          )}
          {initial &&image==="" && (
            initials()
          )}
          {loader&&(
             <div className="absolute bottom-1 right-1 w-3 h-3 border-2 border-white border-t-pink-500 rounded-full animate-spin"></div>
          )}
        </div>

        {/* Edit button */}
        <label className="absolute bottom-0 right-0 bg-indigo-500 hover:bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-md">
          📷
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

      </div>

    </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{user.username || "Your Name"}</p>
            <p className="text-sm text-gray-400">{user.email || "your@email.com"}</p>
          </div>
        </div>
 
        {/* ── Divider ── */}
        <div className="h-px bg-gray-100" />
 
        {/* ── Fields ── */}
        <div className="flex flex-col gap-5">
          {fields.map(({ label, value, placeholder }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {label}
              </label>
              <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-800">
                {value || <span className="text-gray-400">{placeholder}</span>}
              </div>
            </div>
          ))}
        </div>
 
        {/* ── Divider ── */}
        <div className="h-px bg-gray-100" />
 
        {/* ── Buttons side by side ── */}
        <div className="flex justify-around">
          <button
            onClick={showform}
            className="flex py-2 rounded-xl text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all duration-200 px-6 "
          >
            Complete Profile
          </button>
          <LogoutBtn/>
        </div>
 
      </div>
    </div>
  )
}

export default Profile
