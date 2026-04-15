import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        background: "linear-gradient(135deg, #f0a0be 0%, #e8789a 30%, #d4568a 65%, #be3872 100%)",
        borderTop: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">DevBlog</h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Sharing knowledge about web development, backend systems, and
            programming journeys.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/",          label: "Home" },
              { to: "/", label: "All Posts" },
              { to: "AddPost",  label: "Write Blog" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/about",          label: "About" },
              { to: "/contact",        label: "Contact" },
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms",          label: "Terms & Conditions" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-center py-4 text-sm"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        © {new Date().getFullYear()} DevBlog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;