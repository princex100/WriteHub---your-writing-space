import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { configService } from '../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authslice';
import parser from "html-react-parser"
import HeroSection from './Herosection';
import { showerr } from '../store/errorslice';
function Home() {
  const [loader,setloader]=useState(false);
  const dispatch=useDispatch();
  const authstatus=useSelector(state=>state.auth.authstatus);
  const navigate=useNavigate()
  const userdata=useSelector(state=>state.auth.userdata);
  const [posts,setposts]=useState([]);
  const [isempty,setisempty]=useState(true)

 useEffect(()=>{
  
  if(authstatus){
 configService.listRows()
    .then((res)=>{
      setposts(res.rows);
      setloader(true)
      
    })
    .catch(()=>{
      dispatch(showerr("failed to load posts."))
    })
  }
  else{
  dispatch(logout());
  const t = setTimeout(() => setloader(true), 0)
  return () => clearTimeout(t)
  }
   
    
 },[authstatus, dispatch])

 

 useEffect(()=>{
  
posts.forEach(e=>{
        if(e.userId===userdata.$id){
          setisempty(false)
        }
      })
 },[posts,userdata])

 

   return loader?(
   <div className="min-h-screen"
  style={{
    background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
  }}>
    <HeroSection/>
  {authstatus&&(
    <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-2 pb-4">
     
    {posts && !isempty&& posts.map((e) => {

      
      if(e.userId!==userdata.$id)return
      const image = configService.getfileview(e.featuredImage);

     

      return (
       <Link
  to={`posts/${e.$id}`}
  key={e.$id}
  className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 "
  style={{
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.7)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(180,60,100,0.1), 0 2px 8px rgba(180,60,100,0.08)",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = "0 20px 48px rgba(180,60,100,0.2), 0 4px 16px rgba(180,60,100,0.12)"
    e.currentTarget.style.background = "rgba(255,255,255,0.72)"
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = "0 8px 32px rgba(180,60,100,0.1), 0 2px 8px rgba(180,60,100,0.08)"
    e.currentTarget.style.background = "rgba(255,255,255,0.55)"
  }}
>
  {/* Image */}
  <div className="h-52 w-full overflow-hidden" style={{ borderRadius: "20px 20px 0 0" }}>
    <img
      src={image}
      alt="post"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* shimmer top edge */}
  <div style={{
    position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
    pointerEvents: "none",
  }} />

  {/* Content */}
  <div className="flex flex-col gap-3 p-5">
    <h2
      className="text-lg font-bold leading-snug transition-colors duration-200"
      style={{ color: "#7a1848" }}
    >
      {e.title}
    </h2>

    <div
      className="text-sm line-clamp-3 leading-relaxed"
      style={{ color: "rgba(120,40,80,0.7)" }}
    >
      {parser(e.content)}
    </div>

    {/* Read more pill */}
    <div className="mt-0.5">
      <span
        className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, rgba(240,120,154,0.15), rgba(190,56,114,0.15))",
          border: "1px solid rgba(212,86,138,0.3)",
          color: "#be3872",
        }}
      >
        Read more →
      </span>
    </div>
  </div>
</Link>
      );
    })}


   

  </div>
  )}
{authstatus&&isempty && (
    <div className="flex flex-col items-center justify-center min-w-full gap-4 min-h-full">
        <div className="text-8xl">📭</div>
        <h1 className="text-3xl font-bold text-gray-700">
            No Posts Yet!
        </h1>
        <p className="text-gray-400 text-lg">
            Looks like there are no posts here.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
        onClick={()=>navigate("/AddPost")}
        >
            Create First Post
        </button>
    </div>
)}

 {!authstatus && (
    <>
    <div className="h-100 flex items-center justify-center px-4">

  <div 
    className="p-8 rounded-2xl text-center space-y-4 max-w-md w-full border border-white/60"
    style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)" }}
  >

    <h1 className="text-2xl font-bold text-pink-700">
      🔒 Login to Read Posts
    </h1>

    <p className="text-pink-400 text-sm">
      You need to be logged in to access blog content.
    </p>

    <Link
      to="/login"
      className="inline-block mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg
                 hover:bg-pink-600 active:scale-95
                 transition duration-200"
    >
      Go to Login
    </Link>

  </div>
</div>
    </>
   )}

</div>

 
   ):
   (
    <>
   
   <div className="flex flex-col items-center justify-center  gap-5 min-h-screen">
      <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
      <span className="text-xs tracking-widest uppercase text-gray-400 animate-pulse font-mono">
        Loading…
      </span>
    </div>

  
   
  </>
)
}

export default Home





