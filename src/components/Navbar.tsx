"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Programs", href: "#programs" },
        { name: "Leadership", href: "#leadership" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-gray-950/80 backdrop-blur-md shadow-lg py-2 border-b border-gray-800"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                        {/* Using a placeholder if logo doesn't exist, but assuming it does based on previous Hero code */}
                        <Image
                            src="/logo.png"
                            alt="FutureYouthCLT Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        FutureYouthCLT
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors text-sm font-medium hover:scale-105 transform duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://linktr.ee/futureYouthCLT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                    >
                        Join Us
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col items-center py-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white text-lg font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://linktr.ee/futureYouthCLT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold"
                    >
                        Join Us
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
