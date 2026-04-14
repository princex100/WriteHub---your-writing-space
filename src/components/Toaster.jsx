import React from 'react'

function Toaster({message,type}) {
  console.log(message);
  
  return (
    <div
  className={`fixed right-5 top-[50px] z-100 flex items-center gap-3 px-4 py-3 rounded-xl min-w-[260px]`}
  style={{
    background: type === "success"
      ? "linear-gradient(135deg, #f0a0be, #d4568a)"
      : "linear-gradient(135deg, #e87878, #c03050)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 32px rgba(180,60,100,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
    backdropFilter: "blur(12px)",
    animation: "slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  }}
>
  <style>{`
    @keyframes slideInRight {
      from { transform: translateX(120%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
  `}</style>

  {/* Icon */}
  <span className="text-lg">
    {type === "success" ? "✔️" : "❌"}
  </span>

  {/* Message */}
  <p className="flex-1 text-sm font-medium text-white">{message}</p>

  {/* Close button */}
  {/* <button className="text-white hover:opacity-70 transition-opacity">
    ✖
  </button> */}
</div>
  )
}

export default Toaster
