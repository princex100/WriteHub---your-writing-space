import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const features = [
  { icon: "✍️", text: "Write & Save" },
  { icon: "🖊️", text: "Edit Anytime" },
  { icon: "🗑️", text: "Delete Posts" },
  { icon: "🔒", text: "Secure Auth" },
  { icon: "📸", text: "Featured Images" },
]

export default function HeroSection() {
  const navigate = useNavigate()
  const authstatus = useSelector(state => state.auth.authstatus)
  
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center px-6 py-24 text-center">

      <div style={{
        position: "absolute", top: "-60px", left: "-80px",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", right: "-60px",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,220,0.4) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      {/* Animated Content Wrapper */}
      <div 
        className={`relative z-10 flex flex-col items-center transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.7)",
            color: "#be3872",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(180,60,100,0.1)",
          }}
        >
          <span style={{ fontSize: "8px" }}>●</span>
          Your personal blogging space — free forever
        </div>

        <h1
          className="text-5xl sm:text-6xl font-black leading-tight mb-4 max-w-3xl"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#5a0e2c",
            letterSpacing: "-0.03em",
          }}
        >
          Your Stories,{" "}
          <span style={{
            background: "linear-gradient(135deg, #d4568a, #be3872, #8b1a4a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Your Voice
          </span>
          <br />Kept Just for You.
        </h1>

        <p
          className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(120,30,70,0.7)" }}
        >
          Create an account, write beautiful posts, edit them anytime,
          and keep your ideas safe — all in one private space.
          <span style={{ color: "#be3872", fontWeight: 600 }}> No limits. Just you and your words.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate(authstatus ? "/AddPost" : "/SignUp")}
            className="px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #e8789a, #d4568a, #be3872)",
              boxShadow: "0 8px 24px rgba(180,60,100,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(180,60,100,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(180,60,100,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            {authstatus ? "✍️  Write a Post" : "🚀  Get Started Free"}
          </button>

          
        </div>

        {/* features strip */}
        <div className="flex flex-wrap justify-center gap-3">
          {features.map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.65)",
                color: "#8b1a4a",
                backdropFilter: "blur(8px)",
              }}
            >
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}