
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';

interface ArchiveProject {
  year: string;
  title: string;
  description: string;
  category: string;
  builtWith: string[];
  link: string;
}

const projects: ArchiveProject[] = [
  { 
    year: '2025', 
    title: 'Spotify: Focus Mode Intelligence', 
    description: 'Focus Mode Intelligence is a conceptual Spotify feature that automatically adapts music playback based on a user’s current activity - Coding, Reading, or Relaxing..',
    category: 'UI Design', 
    builtWith: ['UX','Strategy','Research'], 
    link: 'https://www.notion.so/Spotify-Focus-Mode-Intelligence-2ebbe2d7216a80cf8bcee6c78ddf1395?source=copy_link' 
  },
  { 
    year: '2024', 
    title: 'Serenova: AI-Travel Planner', 
    description: 'Serenova is a smart travel planning mobile application designed to create highly personalized travel experiences across India.',
    category: 'UI Design', 
    builtWith: ['React', 'D3.js', 'Fintech'], 
    link: 'https://www.notion.so/Serenova-AI-Powered-Personalized-Travel-Planner-2e5be2d7216a8034a3cbdf65ba064ecc?source=copy_link' 
  },
  { 
    year: '2024', 
    title: 'AI-Fitness Coach', 
    description: 'A habit-first MVP designed to bridge the gap between intent and action. Focused on defining PRDs, user flows, and a prioritized feature roadmap to validate personalized daily coaching through simulated 10-day cycles.',
    category: 'Product Strategy', 
    builtWith: ['AI', 'Product Design', 'MVP'], 
    link: 'https://www.notion.so/AI-FITNESS-COACH-2c5be2d7216a8071a375fd5e6d48221e?source=copy_link' 
  },
  { 
    year: '2024', 
    title: 'Uber: Fare Integrity', 
    description: 'Redesigning the ride-completion experience to solve for clarity and trust. This study explores real-time adjustment breakdowns and cost transparency for both drivers and riders during peak volatility.',
    category: 'UI/UX Design', 
    builtWith: ['Research', 'UX'], 
    link: 'https://www.notion.so/Case-Study-Real-Time-Fare-Revision-Transparency-for-Ride-Hailing-Apps-Uber-2cabe2d7216a80ce845bd86145758bec?source=copy_link' 
  },
  /* { 
    year: '2024', 
    title: 'Multi-Class Image Recognition', 
    description: 'End-to-end computer vision pipeline developed to automate industrial quality control. Utilizes a custom CNN architecture to achieve high accuracy in detecting manufacturing defects across diverse hardware categories.',
    category: 'Data Science', 
    builtWith: ['CNN', 'Python', 'ML'], 
    link: '#' 
  }, */
  
  { 
    year: '2024', 
    title: 'LearnSign: Real-Time Sign Language Learning Tool', 
    description: 'LearnSign is a gamified e-learning mobile application that teaches sign language to children using AI-powered gesture recognition and Augmented Reality (AR).',
    category: 'App Development', 
    builtWith: ['Reactjs', 'Flask', 'TailwindCSS','MySQL'], 
    link: 'https://www.notion.so/LearnSign-Real-Time-Sign-Language-Learning-Tool-2e7be2d7216a80c78be2fad2324d2afb?source=copy_link' 
  },
  
  /* { 
    year: '2023', 
    title: 'Predictive Modeling', 
    description: 'Statistical analysis project using R and Tableau to forecast market trends. Leveraged historical datasets to create risk assessment models that inform strategic decision-making in high-volatility sectors.',
    category: 'Data Analysis', 
    builtWith: ['R', 'Tableau', 'Stats'], 
    link: '#' 
  },
  { 
    year: '2022', 
    title: 'Social Media App Concept', 
    description: 'An interest-driven community platform designed for niche hobbies. Includes full high-fidelity prototyping and user testing to validate core features like collaborative discovery and shared spaces.',
    category: 'UI/UX', 
    builtWith: ['Figma', 'Prototyping'], 
    link: '#' 
  },
  { 
    year: '2022', 
    title: 'Brand Identity: Aquilon', 
    description: 'A complete design system developed for a deep-tech startup. Includes logo architecture, typography guidelines, and scalable UI components designed to communicate reliability and speed.',
    category: 'Branding', 
    builtWith: ['Illustrator', 'Design Systems'], 
    link: '#' 
  }, */
];

const Archive: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#121210] pt-40 pb-32 px-6 relative overflow-hidden"
    >
      {/* Background decoration consistent with portfolio blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="flex-1">
            <button 
              onClick={onBack}
              className="flex items-center gap-3 text-indigo-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-10 hover:text-white transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Home
            </button>
            <h1 className="font-serif text-6xl md:text-[8rem] leading-[0.9] tracking-tighter text-white">
              The <span className="italic text-emerald-400 block md:inline">Archive.</span>
            </h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" size={20} />
            <input 
              type="text" 
              placeholder="Filter by title, tag, or desc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-8 py-5 bg-[#1c1c1a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-white font-sans text-base placeholder:text-stone-600 shadow-2xl"
            />
          </div>
        </div>

        {/* Desktop View: Styled Table-List */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/5 px-8">
            <div className="col-span-1 text-[10px] font-bold tracking-[0.3em] text-stone-600 uppercase">Year</div>
            <div className="col-span-5 text-[10px] font-bold tracking-[0.3em] text-stone-600 uppercase">Project & Description</div>
            <div className="col-span-2 text-[10px] font-bold tracking-[0.3em] text-stone-600 uppercase text-center">Category</div>
            <div className="col-span-3 text-[10px] font-bold tracking-[0.3em] text-stone-600 uppercase">Stack</div>
            <div className="col-span-1 text-[10px] font-bold tracking-[0.3em] text-stone-600 uppercase text-right">View</div>
          </div>
          
          <div className="mt-4 space-y-4">
            {filteredProjects.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 items-center p-8 rounded-3xl bg-[#1c1c1a]/50 border border-white/5 hover:bg-[#1c1c1a] hover:border-white/10 transition-all duration-300 group cursor-default"
              >
                <div className="col-span-1 font-mono text-sm text-stone-500">{p.year}</div>
                <div className="col-span-5 pr-8">
                  <div className="font-serif text-3xl text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {p.title}
                  </div>
                  <p className="text-stone-500 text-sm font-sans line-clamp-3 group-hover:text-stone-300 transition-colors leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                    {p.category}
                  </span>
                </div>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {p.builtWith.map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-stone-400 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="col-span-1 flex justify-end">
                  <a 
                    href={p.link} 
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group-hover:rotate-45"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View: Vertical Cards */}
        <div className="md:hidden space-y-6">
          {filteredProjects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-[#1c1c1a] rounded-[2rem] border border-white/5 shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-stone-600">{p.year}</span>
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[9px] font-bold tracking-widest uppercase border border-indigo-500/10">
                  {p.category}
                </span>
              </div>
              <h3 className="font-serif text-3xl text-white mb-3 leading-tight">{p.title}</h3>
              <p className="text-stone-500 text-sm font-medium mb-6 leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.builtWith.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-stone-400">{tag}</span>
                ))}
              </div>
              <a 
                href={p.link} 
                className="flex items-center justify-between py-4 border-t border-white/5 text-xs font-bold tracking-widest text-emerald-400 uppercase group"
              >
                View Case Study 
                <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-stone-500 font-serif text-3xl italic">No matching records in the vault.</p>
            <button 
              onClick={() => setSearch('')}
              className="mt-6 text-indigo-400 font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Grid Pattern consistency */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archive-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archive-grid)" />
        </svg>
      </div>
    </motion.div>
  );
};

export default Archive;
