import React from "react";
import { createSlice } from "@reduxjs/toolkit";


const initialState={
      userdata:{},
      authstatus:false,
      CompleteForm:false,
      githubLogin:false,
      googleLogin:false,
      avt:false,
      register:false,
      oauth:"none",
      firsttimelogin:true
}

const authslice=createSlice({
      name:"blog",
      initialState,
      reducers:{
            userlogin:(state,action)=>{
                state.userdata=action.payload;
                state.authstatus=true;
            }
            ,
            logout:(state)=>{
                state.userdata={};
                state.authstatus=false;

            },
            showCompleteForm:(state)=>{
               state.CompleteForm=true
            },
            hideCompleteForm:(state)=>{
               state.CompleteForm=false

            },
            setgithublogin:(state)=>{
                state.githubLogin=true
                console.log(state.githubLogin);
                
            },
            removegithublogin:(state)=>{
                state.githubLogin=false
                  
            },
            setgooglelogin:(state)=>{
                  // console.log(action.payload);
                  
                state.googleLogin=true
                  
            },
            removegooglelogin:(state)=>{
                state.googleLogin=false
                  
            },
             setavt:(state)=>{
                state.avt=true
                  
            },
             removeavt:(state)=>{
                state.avt=false
                  
            },
            setregister:(state)=>{
                  state.register=true
            },
            removeregister:(state)=>{
state.register=false
            },
             setoAuth:(state,action)=>{
state.oauth=action.payload
            },
             removeoAuth:(state)=>{
state.oauth="none"
            },
            changefirsttimelogin:(state)=>{
state.firsttimelogin=!state.firsttimelogin
            },
         

      }
})

export const {userlogin,logout,showCompleteForm,hideCompleteForm,setgithublogin,setgooglelogin,removegithublogin,removegooglelogin,setavt,removeavt,setregister,removeregister,removeoAuth,setoAuth,changefirsttimelogin} =authslice.actions;
export default authslice.reducer