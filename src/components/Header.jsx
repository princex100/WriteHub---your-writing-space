import React from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

export default function Header() {
  const authstatus = useSelector(state => state.auth.authstatus)

  const buttons = [
    {
      title: "login",
      slug: "/login",
      auth: !authstatus
    },
    {
      title: "signup",
      slug: "/SignUp",
      auth: !authstatus
    },
    {
      title: "Home",
      slug: "",
      auth: true
    },
    {
      title: "Add Post",
      slug: "/AddPost",
      auth: authstatus
    },
    {
      title: "profile",
      slug: "/profile",
      auth: authstatus
    }
  ]

  return (
    // Outer wrapper: Removed backdrop blur so it doesn't create a rectangular band
    <div className="w-full flex justify-center px-6 py-4 sticky top-0 z-50 bg-transparent"
    style={{
    background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
  }}
    >
      
      {/* Inner wrapper: The actual glassmorphism pill */}
      <div
        className="w-full max-w-5xl rounded-full px-6 py-3 flex items-center justify-between relative overflow-hidden backdrop-blur-xl transition-all duration-300"
        style={{
          // A soft semi-transparent white/pinkish tint to blend with the hero section
          background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
          boxShadow: "0 8px 32px rgba(180, 60, 100, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        {/* Glass reflection overlay */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "45%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
          borderRadius: "9999px 9999px 0 0",
          pointerEvents: "none",
        }} />

        {/* Top subtle glow line to define the upper edge */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          pointerEvents: "none",
        }} />

        {/* Logo - Updated to match the maroon/pink text of your hero section */}
        <div className="text-xl font-bold tracking-tight select-none relative z-10 flex items-center drop-shadow-sm">
          <span style={{ color: "#5a0e2c" }}>My</span>
          <span style={{
            background: "linear-gradient(135deg, #d4568a, #be3872)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Blog
          </span>
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-2 relative z-10">
          {buttons.map(e =>
            e.auth && (
              <Link key={e.slug} to={e.slug}>
                <Button slug={e.slug} title={e.title} />
              </Link>
            )
          )}
        </div>

      </div>
    </div>
  )
}