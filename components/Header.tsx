'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary-green-dark/30">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo width={50} height={50} />
            <div className="hidden sm:block">
              <h1 className="text-xl font-display text-primary-green-light">FUTURE YOUTH</h1>
              <p className="text-xs text-primary-green-medium">NETWORK EST. 2025</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-primary-green-light transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfWoWxWV_Pg2R_3JeQcjKU-OJG_xkbATDqB85t_CnW1KjquTg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-green-medium hover:bg-primary-green-light 
                         text-black font-semibold rounded-lg transition-colors duration-200"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-green-light"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-primary-green-dark/30"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-primary-green-light transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfWoWxWV_Pg2R_3JeQcjKU-OJG_xkbATDqB85t_CnW1KjquTg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-green-medium hover:bg-primary-green-light 
                           text-black font-semibold rounded-lg transition-colors duration-200 text-center"
              >
                Sign Up
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

