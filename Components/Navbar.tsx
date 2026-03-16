"use client"

import React, { useEffect, useState,  } from 'react'
import Link from "next/link";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact-us' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

        .navbar-root { font-family: 'Jost', sans-serif; }
        .logo-font { font-family: 'Cormorant Garamond', serif; }

        .nav-link-item {
          position: relative;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 500;
          transition: color 0.3s ease;
          padding-bottom: 4px;
          cursor: pointer;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%; height: 1px;
          background: #fa3132;
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link-item:hover::after, .nav-link-item.active::after { width: 100%; }
        .nav-link-item:hover, .nav-link-item.active { color: #fa3132; }

 
        .navbar-transparent {
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .logo-mark {
        object-fit: contain;    
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .logo-mark::before {
          content: '';
          position: absolute;
          width: 28px; height: 28px;
        }

        .cta-btn {
          border: 1px solid #fa3132;
          color: #fa3132;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 8px 20px;
          position: relative; overflow: hidden;
          cursor: pointer;
          transition: color 0.35s ease;
          background: transparent;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #fa3132;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { color: #0a0a0e; }
        .cta-btn span { position: relative; z-index: 1; }

        .hamburger span {
          display: block; width: 22px; height: 1px;
          background: #e8e0d0;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }

        .mobile-menu {
          background: rgba(10, 10, 14, 0.97);
          border-top: 1px solid rgba(201, 169, 110, 0.2);
        }
        .mobile-nav-link {
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 0.75rem;
          color: #fa3132;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: #fa3132; background: rgba(201,169,110,0.05); }
      `}</style>




      <nav className={`navbar-root !bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-500  navbar-transparent`}>
        <div className="max-w-7xl mx-auto  ">
          <div className="flex items-center justify-between h-[110px]">

            {/* Logo — left side */}
            <div className="flex items-center gap-3 flex-shrink-0">
<img
  src="/logo.jpeg"
  alt="Logo"
className='w-[156px]'
 
/>
</div>

            {/* Center Nav Links */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`nav-link-item text-[#fa3132] ${activeLink === link.label ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right — CTA + hamburger */}
            <div className="flex items-center gap-4">
              <button className="cta-btn hidden md:block"><span>Get Started</span></button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`hamburger md:hidden flex flex-col gap-[5px] p-2 ${menuOpen ? 'open' : ''}`}
                aria-label="Toggle menu"
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu md:hidden">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                onClick={() => { setActiveLink(link.label); setMenuOpen(false) }}
                className={`mobile-nav-link ${activeLink === link.label ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="p-4">
              <button className="cta-btn w-full"><span>Get Started</span></button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar