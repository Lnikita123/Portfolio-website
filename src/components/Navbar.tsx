"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 30);

    // Scroll spy: the section whose top is closest above the viewport centre wins
    const ids = [...navLinks.map((l) => l.href.slice(1)), "contact"];
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between md:justify-center gap-6 h-16 md:h-20">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-2 py-1.5">
            {navLinks.map((link, index) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/25 to-cyan-500/25 border border-purple-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex md:absolute md:right-4 lg:right-8 items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow"
          >
            <FaPaperPlane size={12} />
            Hire Me
          </motion.a>

          {/* Mobile: label + menu button */}
          <span className="md:hidden text-sm font-medium tracking-[0.2em] uppercase text-gray-500">
            Portfolio
          </span>
          <motion.button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 -mr-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </motion.button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="origin-left h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-400"
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {[...navLinks, { name: "Contact", href: "#contact" }].map(
                (link, index) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-purple-500/15 text-white border border-purple-500/30"
                          : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  );
                }
              )}

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold"
              >
                <FaPaperPlane size={13} />
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
