import React from "react";
import {useNavigate}from "react-router-dom"
 
function Button({
  title,
  slug,
  type = "button",
  className = "",
  ...props
}) {

  return (
     <button
      type={type}
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        color: "#8b1a4a", 
        boxShadow: "0 2px 10px rgba(180, 60, 100, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(4px)",
      }}
      className={`
        px-5 py-2 rounded-full font-semibold text-sm
        active:scale-95 focus:outline-none cursor-pointer
        ${className}
      `}
      onMouseEnter={e => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(212, 86, 138, 0.15), rgba(190, 56, 114, 0.15))"
        e.currentTarget.style.borderColor = "rgba(190, 56, 114, 0.4)"
        e.currentTarget.style.color = "#be3872" 
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(190, 56, 114, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
        e.currentTarget.style.transform = "translateY(-1px) scale(1.03)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)"
        e.currentTarget.style.color = "#8b1a4a"
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(180, 60, 100, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
        e.currentTarget.style.transform = "translateY(0) scale(1)"
      }}
      {...props}
    >
      {title}
    </button>
  )
}
 
export default Button