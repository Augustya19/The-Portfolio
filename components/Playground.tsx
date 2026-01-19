
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface PlaygroundItem {
  id: number;
  category: string;
  title: string;
  image: string;
  link: string;
}

const categories = ['All', 'Digital Art', 'Illustration', 'Web Design','UI Design'];

const items: PlaygroundItem[] = [
  {
    id: 1,
    category: 'Illustrations',
    title: 'A Visual Study',
    image: '/girl.jpg',
    link: 'https://www.behance.net/gallery/241410213/A-Visual-Study?share=1'
  },
  {
    id: 2,
    category: 'Digital Art',
    title: 'The Process',
    image: '/art1.jpg',
    link: 'https://www.behance.net/gallery/241962553/The-Process-Modern-Digital-Illustration'
  },
  {
    id: 3,
    category: 'Web Design',
    title: 'Shush',
    image: '/shush.jpg',
    link: 'https://shush-health.vercel.app/'
  },
  
  {
    id: 4,
    category: 'Digital Art',
    title: 'A Moment of Calm',
    image: '/art2.JPG',
    link: 'https://www.behance.net/gallery/241962693/A-Moment-of-Calm-Digital-Artwork?share=1'
  },
  {
    id: 5,
    category: 'Illustration',
    title: 'Soft Gaze',
    image: '/art3.jpg',
    link: 'https://www.behance.net/gallery/241961873/Soft-Gaze-Digital-Anime-Portrait?share=1'
  },
  
  /* {
    id: 6,
    category: 'Illustration',
    title: 'Character Study',
    image: 'https://images.unsplash.com/photo-1633531301335-d667c33f20f1?q=80&w=1964&auto=format&fit=crop',
    link: 'https://behance.net'
  },
  {
    id: 7,
    category: 'Branding',
    title: 'Minimalist Identity',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop',
    link: 'https://behance.net'
  } */
];

const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <section id="playground" className="py-32 px-6 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6 font-sans"
          >
            <Sparkles size={12} />
            Visual Playground
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 tracking-tight font-sans"
          >
            Where <span className="text-indigo-600">Creativity</span> Flows
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-lg md:text-xl max-w-2xl font-medium font-sans"
          >
            A collection of visual experiments, design explorations, and creative projects
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 font-sans ${
                activeTab === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white text-stone-500 border border-stone-100 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Fluid Masonry-style Grid using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.a
                layout
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative group block rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 bg-white break-inside-avoid mb-8"
              >
                <div className="overflow-hidden bg-stone-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-[9px] font-bold tracking-widest text-stone-700 uppercase shadow-sm font-sans">
                    {item.category}
                  </span>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" size={24} />
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="h-px w-32 bg-stone-200 mb-8"></div>
          <a 
            href="https://www.behance.net/augustyayadav" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-indigo-600 font-bold text-xs tracking-widest uppercase transition-colors font-sans flex items-center gap-2"
          >
            View More on Behance <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Playground;
