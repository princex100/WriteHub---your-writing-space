import { createSlice } from "@reduxjs/toolkit";

const initialState={
    error:[],
    showErr:false
}

const errorslice=createSlice({
  name:"errorslice",
  initialState,
  reducers:{
    showerr:(state,action)=>{
      console.log(state.error);
      
      state.error.push(action.payload),
      state.showErr=true
    },
    hideError:(state,payload)=>{
       state.error=[],
       state.showErr=false
    }
  }
})


export const {hideError,showerr}=errorslice.actions
export default errorslice.reducer