import React, { useEffect, useState } from 'react'
import { oAuthservice } from '../config/Oauth.config'
import { useDispatch, useSelector } from 'react-redux'
import { setgooglelogin, userlogin } from '../store/authslice'
import { useNavigate } from 'react-router-dom'
import { showerr } from '../store/errorslice'


function Oauth() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [err,seterr]=useState("")
  const params=new URLSearchParams(window.location.search)
  const userId=params.get("userId")
  const secret=params.get("secret")
  // const oauth=useSelector(state=>state.auth.oauth)

  if(!userId||!secret){
    // error popup
    return console.error("userid or secret missing")
  }

  useEffect(()=>{
    const get=async()=>{
      try {
  
        const user=await oAuthservice.createAndGetSession({userId,secret})
        if(user){
          const auth="none";
            if(oauth==="google")auth="google"
           else if(oauth==="github")auth="github"
             await configService.setUserInfo({email:user.email,userId:user.$id,username:user.name,oauth:auth})
          
console.log(user);

          dispatch(userlogin(user))
          navigate("/")
        }
        else{
          navigate("/")
        }
      } catch (error) {
         seterr(error)
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
