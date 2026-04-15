import React, { useEffect, useState } from 'react'
import { oAuthservice } from '../config/Oauth.config'
import { useDispatch, useSelector } from 'react-redux'
import { setgooglelogin, userlogin } from '../store/authslice'
import { useNavigate } from 'react-router-dom'
import { showerr } from '../store/errorslice'
import { configService } from '../config/config'


function Oauth() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [err,seterr]=useState("")
  const params=new URLSearchParams(window.location.search)
  const userId=params.get("userId")
  const secret=params.get("secret")
  const oauth=useSelector(state=>state.auth.oauth)

  if(!userId||!secret){
    // error popup
    dispatch(showerr("userid or secret missing"))
    return 
  }

  useEffect(()=>{
    const get=async()=>{
      try {
  
        const user=await oAuthservice.createAndGetSession({userId,secret})
        
        if(user){
        
             await configService.setUserInfo({email:user.email,userId:user.$id,username:user.name,oauth:"oauth"})
          

          dispatch(userlogin(user))
          navigate("/")
        }

        else{
          navigate("/")
        }
      }
       catch (error) {

        dispatch(showerr(error.message))

      }
    }
    get()

  },[])

  return (
   <>
   {err===""&&(
    <div>
      signing you in....
    </div>
   )}
   {err!==""&& navigate("/")}
   </>
  )
}

export default Oauth
