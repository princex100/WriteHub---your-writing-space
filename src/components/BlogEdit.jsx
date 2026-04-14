import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authservice } from '../config/auth';
import { configService } from '../config/config';
import parser from "html-react-parser"

function BlogEdit() {

    const {id}=useParams()

    const navigate=useNavigate();

    const [post,setpost]=useState();
    const [loader,setloader]=useState(false);

    useEffect(()=>{
      
      configService.listRows()
        .then(res=>{
            const a=res.rows.find((e)=>e.$id===id)
            setpost(a);
            setloader(true)
        })
     
    },[])

    let image=null;
    
     if(post){
      console.log(post.featuredImage);
      
      image=configService.getfileview(post.featuredImage)
     }


   function editpost(){
       navigate("/AddPost",{state:{post}})
   }


   function deletePost(){
     console.log(post)
     configService.deleteRow(post.$id)
     .then(res=>navigate("/"))
     .catch(err=>1)
   }
    


return loader?(
  <div className="max-w-4xl mx-auto p-6">

    {/* Top Right Buttons */}
    <div className="flex justify-end gap-3 mb-4">
      <button
  className="bg-white/20 backdrop-blur-md border border-white/30 text-pink-700 px-4 py-1 rounded-lg hover:bg-pink-400/30 hover:text-white transition-all duration-300 shadow-md"
  onClick={editpost}
>
  Edit
</button>

<button
  className="bg-white/20 backdrop-blur-md border border-white/30 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500/40 hover:text-white transition-all duration-300 shadow-md"
  onClick={deletePost}
>
  Delete
</button>
    </div>

    {/* Image */}
    <div className="flex justify-center">
      <img
        src={image}
        className="rounded-2xl w-full max-h-112.5 object-cover shadow-lg "
        alt="blog"
      />
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold mt-6 text-center">
      {post?.title}
    </h1>

    {/* Content */}
    <p className="mt-4 text-gray-700 text-lg text-center leading-relaxed">
      {post&&parser(post.content)}
      
    </p>

  </div>
):(
  <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
      <span className="text-xs tracking-widest uppercase text-gray-400 animate-pulse font-mono">
        Loading…
      </span>
    </div>
  
)
}

export default BlogEdit
