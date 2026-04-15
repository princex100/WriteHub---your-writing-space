import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useRef } from "react";
import Input from "./Input";
import RTE from "./RTE";
import { configService } from "../config/config";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 
"react-router-dom";
import parser from "html-react-parser"
import Toaster from "./Toaster";

export default function PostForm() {
  const [toaster,settoaster]=useState(false)
  const [error,seterror]=useState("")
  const response=useLocation();
 
 const {register,control,handleSubmit,getValues,setValue,watch,formState:{errors,submitCount},}=useForm({
 
      defaultValues:{
        title:response.state?.post?.title||"",
        slug:response.state?.post?.$id||"",
        featuredImage:response.state?.post?.featuredImage||"",
        content:response.state?.post?.content||"",
        status:response.state?.post?.status||"",
      }
     }
 
   );
   const slugtranform=(title)=>{
    
       if(title&&typeof title==="string"){
        const t= title
        .trim()
        .toLowerCase()
        .replace(/[/|\s\\]+/g,'-')
        return t
       }
   }
  
   useEffect(()=>{
    
 const subscription=watch((value,{name})=>{
  
    if(name==="title"){
    setValue("slug",slugtranform(value.title))
    }
   })
   return ()=>subscription.unsubscribe()


   },[watch,slugtranform])

//    const showErr=(message)=>{
//      seterror(message)
//     settoaster(true)

   
// setTimeout(() => {
//     seterror("")
//     settoaster(false)
     
     
//    }, 2000);
//    }
   

   const navigate=useNavigate();

   const userdata=useSelector(state=>state.auth.userdata);

   const content=parser(getValues("content"))

  const submit=async(data)=>{

      if (response.state) {
        try {
            // 1. Pehle nayi file upload
            
            const uploadfile = await configService.uploadFile(data.featuredImage[0]);

            if (uploadfile) {
                // 2. Phir document update
                const savepost = await configService.updaterow({
                  
                    slug: response.state?.post?.$id, // ✅
                    title: data.title,
                    status: data.status,
                    content: data.content,
                    featuredImage: uploadfile.$id,
                });

                if (savepost) {
                    // 3. Purani file delete karo last mein
                    await configService.deleteFile(response.state?.post?.featuredImage);
                    navigate("/");
                }
            }
        } catch (error) {
            // console.log(10);

          showErr(error.message,"error")
          return
            // console.log("Error:", error);
        }
    }
      else{
           try{
            console.log(data);
            
             const uploadfile=await configService.uploadFile(data.featuredImage[0]);
                  if(uploadfile){

                  const savepost=await configService.createRow({
                    title:data.title,
                    slug:data.slug,
                    status:data.status,
                    content:data.content,
                    featuredImage:uploadfile.$id,
                    userId:userdata?.$id,
                  });

                  if(savepost){
                     navigate("/");
                  }
                }
           }
           catch(err){
            // console.log(11);
            
                       showErr(err.message,"error")

            return
           }
      }
  }
  const checkErrors=()=>{
    if(Object.keys(errors).length!==0){
      setshowerr(true)
    }
  }
const showformError=(err)=>{
  seterror(err)
  settoaster(true)
}
  const ref=useRef();
 useEffect(()=>{
  // console.log(errors);
  
  if(Object.keys(errors).length!==0){
    console.log(errors);
    
    for (const key in errors) {
      // if (!errors.hasOwn(errors, key)) continue;
      if(errors["title"]){
    showErr(errors["title"]["message"])
           
      }
       else if(errors["slug"]){
         showErr(errors["title"]["message"])
      }
      else  if(errors["featuredImage"]){
         showErr(errors["featuredImage"]["message"])
      }
      else  if(errors["status"]){
         showErr(errors["status"]["message"])
      }
       
     

      break;
      
      
    }
    // console.log(errors.title.message);
    
  }
 },[submitCount])
   
  return (
    <>
     <form
      onSubmit={handleSubmit(submit)}
      action=""
      className="w-full mx-auto p-6 "
      style={{
    background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
  }}
    >
    {error&&toaster&& (<Toaster message={error} type="error"/>)}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          <Input
            name="title"
            type='text'
            placeholder="enter title"
            label="title"
            {...register("title",{ required:"title is required!" })
        }
            defaultValue={getValues("title")}
            
            
          />

          <Input
            name="slug"
            type='text'
            placeholder="enter slug"
            label="slug"
            {...register("slug",{ required:true })}
          />

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <RTE control={control} ref={ref}  name="content" defaultValue={content}  />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Input
              type='file'
              {...register("featuredImage",{required:"image is required!"})}
              label="Featured Image"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">
              Status
            </label>
            <select className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            {...register("status",{required:"status is required!"})}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

<div className=" p-4 rounded-lg shadow-sm">
  <button
  onSubmit={checkErrors}
    type="submit"
    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
  >
    🚀 Publish Post
  </button>
   {/* {errors.title && (
        
         <Toaster message={errors.title.message} type="error"/>
      )} */}
</div>
        </div>

      </div>

    </form>
    </>
   
  )
  }
 





