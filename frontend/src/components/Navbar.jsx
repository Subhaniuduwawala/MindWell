import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/service", label: "SERVICE" },
    { to: "/counselors", label: "COUNSELORS" },
    { to: "/contact", label: "SUPPORT" },
    { to: "/about", label: "ABOUT US" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">⚡</span> WellMind 
        </Link>

        <button
          className="nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={open ? "true" : "false"}
          onClick={toggle}
        >
          {open ? (
            // Close (X)
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          <span className="sr-only">Menu</span>
        </button>

        <nav id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={close}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="actions">
            <Link to="/login" className="btn ghost" onClick={close}>Log in</Link>
            <Link to="/signup" className="btn solid" onClick={close}>Sign up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
