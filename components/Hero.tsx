
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-30 overflow-hidden bg-[#fafafa]">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-badge mb-11 text-indigo-500"
      >
        Computer Science Graduate
      </motion.div>
      
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mb-11"
      >
        <h1 className="font-serif text-[clamp(3.5rem,10vw,7rem)] leading-[1.05] tracking-tight text-[#222]">
          Logic meets <br />
          <span className="mt-3 text-indigo-700 italic font-normal relative inline-block">
            Intuition.
            {/* The subtle curved line from the reference */}
            <svg className="absolute -bottom-4 left-0 w-full" height="10" viewBox="0 0 90 12" preserveAspectRatio="none">
              <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="3.5" fill="none" className="text-indigo-700/40" />
            </svg>
          </span>
        </h1>
      </motion.div>
      
      {/* Subtext with Highlights */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-2xl text-stone-420 text-base md:text-xl leading-snug mb-10"

      >
        Exploring the intersection of <span className="text-highlight font-sans">Product Management</span> & <span className="text-highlight font-sans">Graphic Design</span>.
        Creating data-driven solutions with visual soul.
      </motion.div>
      
      {/* Action Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <a 
          href="#work" 
          className="group inline-flex items-center gap-2 pb-2 border-b border-stone-300 hover:border-indigo-600 transition-all duration-300"
        >
          <span className="text-stone-700 font-medium md:text-lg font-sans">View Selected Work</span>
          <ArrowRight size={20} className="text-stone-600 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
