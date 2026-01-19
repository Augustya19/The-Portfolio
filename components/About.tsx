
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 bg-indigo-50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Image with decorative element */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group max-w-[300px] md:max-w-[340px] ml-36 md:ml-16"


        >
          <div className="aspect-[3/4] overflow-hidden shadow-2xl rounded-sm">
            <img 
              src="/aug.jpg" 
              alt="Augustya profile" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Decorative Arc - using theme indigo instead of orange */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none opacity-40">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-indigo-600">
              <path 
                d="M10 90 Q 90 90 90 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                fill="none" 
              />
            </svg>
          </div>
        </motion.div>
        
        {/* Right Column: Text and Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col pt-4"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] mb-12 leading-[1.15]">
            Bridging <span className="text-indigo-600 italic">analytical thinking</span> with creativity.
          </h2>
          
          <div className="space-y-10 text-stone-500 text-lg md:text-xl leading-relaxed font-normal">
            <p>
              I’m a Computer Science graduate, now exploring roles in Graphic Design and Product Management where creativity meets structured problem-solving. Through my academic and internship experience, I’ve worked on data visualization, predictive modeling, and product oriented projects, which shaped the way I think about users, insights, and impact. Alongside this, I’ve developed strong interests and hands-on skills in graphic design focusing on visual storytelling, clarity, and usability.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-stone-100">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-5">
                  Education
                </h4>
                <div className="space-y-1">
                  <p className="text-[#1a1a1a] font-semibold text-base">B.Tech in Computer Science</p>
                  <p className="text-stone-500 text-sm">Arya College of Engineering & I.T</p>
                  <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mt-1">Class of 2025</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.25em] text-emerald-600 uppercase mb-5">
                  Interests
                </h4>
                <p className="text-[#1a1a1a] text-sm leading-relaxed font-medium">
                  Reading, Design & Sketching, Volleyball, Badminton
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
