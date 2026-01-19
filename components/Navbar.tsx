
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    /* { name: 'Playground', href: '#playground' }, */
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onHomeClick();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={onHomeClick} 
            className="font-serif text-2xl font-bold tracking-tight text-stone-700 group"
          >
            augustya<span className="text-indigo-600 group-hover:translate-x-1 inline-block transition-transform">.</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-10 text-stone-500 font-semibold text-[11px] tracking-[0.2em] uppercase font-sans">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.href)}
                className="hover:text-indigo-600 transition-colors relative group/item"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover/item:w-full"></span>
              </a>
            ))}
            <a 
              href="#connect" 
              onClick={(e) => handleLinkClick(e, '#connect')}
              className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-stone-200"
            >
              Connect
            </a>
          </div>

          {/* Mobile Connect Button */}
          <div className="lg:hidden">
            <a 
              href="#connect" 
              onClick={(e) => handleLinkClick(e, '#connect')}
              className="px-6 py-2 bg-stone-900 text-white rounded-full text-[10px] font-bold tracking-widest uppercase"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
