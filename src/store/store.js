import React from "react";
import {configureStore} from "@reduxjs/toolkit"
import authreducers from "./authslice.js"
import errorReducers from "./errorslice.js"



const store=configureStore({
  reducer:{
    auth:authreducers,
    error:errorReducers
  }
  
})

export {store}