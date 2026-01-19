
import React from 'react';
import { motion } from 'framer-motion';
import { WorkItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

const works: WorkItem[] = [
  {
    category: 'PRODUCT',
    title: 'AI-Fitness Coach',
    subTitle: 'PRODUCT STRATEGY',
    description: 'Designed a fast, habit-first AI Fitness Coach MVP in a 10-day simulation, defining PRD, user flows, feature prioritization, and execution strategy to validate personalized daily coaching.',
    tags: ['Discovery', 'Mobile', 'User Research'],
    link: 'https://www.notion.so/AI-FITNESS-COACH-2c5be2d7216a8071a375fd5e6d48221e?source=copy_link'
  },
  {
    category: 'DESIGN',
    title: 'Uber: Fare Integrity',
    subTitle: 'UI/UX CASE STUDY',
    description: 'Redesigning the ride-completion screen to optimize for driver-rider trust and cost transparency by introducing real-time adjustment breakdowns.',
    tags: ['UI/UX', 'System Design'],
    link: 'https://www.notion.so/Case-Study-Real-Time-Fare-Revision-Transparency-for-Ride-Hailing-Apps-Uber-2cabe2d7216a80ce845bd86145758bec?source=copy_link'
  },
  /* {
    category: 'PRODUCT OWNER',
    title: 'Serenova: AI Travel Planner',
    subTitle: 'WEB DEVELOPMENT',
    description: 'Serenova is a smart travel planning mobile application designed to create highly personalized travel experiences across India.The app generates customized destination and itinerary recommendations based on user preferences such as budget, location, number of travelers, travel month, and interests',
    tags: ['UX Research', 'Prototyping', 'Product Design'],
    link: 'https://www.notion.so/Serenova-AI-Powered-Personalized-Travel-Planner-2e5be2d7216a8034a3cbdf65ba064ecc?source=copy_link'
  }, */
  /*{
    category: 'DESIGN',
    title: 'Uber: Fare Integrity',
    subTitle: 'UI/UX CASE STUDY',
    description: 'Redesigning the ride-completion screen to optimize for driver-rider trust and cost transparency by introducing real-time adjustment breakdowns.',
    tags: ['UX Research', 'Prototyping', 'Product Design'],
    link: 'https://www.notion.so/Case-Study-Real-Time-Fare-Revision-Transparency-for-Ride-Hailing-Apps-Uber-2cabe2d7216a80ce845bd86145758bec?source=copy_link'
  }*/
];

interface WorkProps {
  onBrowseArchive: () => void;
}

const Work: React.FC<WorkProps> = ({ onBrowseArchive }) => {
  return (
    <section id="work" className="py-48 px-6 bg-[#121210] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-indigo-400 uppercase mb-8 block font-sans">Portfolio</span>
            <h2 className="font-serif text-6xl md:text-[7rem] leading-[0.9] tracking-tight">
              Selected<br/>
              <span className="italic text-emerald-400">Ventures</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-left md:text-right pb-4"
          >
            <p className="text-stone-400 mb-8 text-lg md:text-xl font-medium leading-relaxed font-sans opacity-80">
              Merging deep analytical systems with high-fidelity creative execution.
            </p>
            <button 
              onClick={onBrowseArchive}
              className="inline-flex items-center gap-3 group text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 hover:text-white transition-all font-sans"
            >
              Browse Archive <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
        
        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {works.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group cursor-pointer flex flex-col justify-between rounded-[3rem] bg-[#1c1c1a] border border-white/5 p-12 md:p-16 min-h-[600px] hover:bg-[#252522] transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-start">
                <span className="px-6 py-2 border border-stone-700 rounded-full text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase font-sans group-hover:text-white group-hover:border-stone-500 transition-all">
                  {item.category}
                </span>
              </div>

              <div className="mt-10 flex flex-col items-start text-left">
                <h3 className="font-serif text-5xl md:text-5xl mb-6 text-white tracking-tight leading-tight transition-transform duration-500 group-hover:-translate-y-1">
                  {item.title}
                </h3>
                <p className="text-indigo-400/80 text-[11px] font-bold tracking-[0.3em] uppercase mb-10 font-sans">
                  {item.subTitle}
                </p>
                <p className="text-stone-400 leading-relaxed text-lg font-medium font-sans max-w-lg group-hover:text-stone-200 transition-colors">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-1 gap-8">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-stone-500 text-sm font-semibold font-sans tracking-wide group-hover:text-stone-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex-shrink-0">
                  <a
  href={item.link}
  target="_blank"
  rel="noopener noreferrer"
  className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 rotate-0 group-hover:rotate-45"
>
  <ArrowUpRight size={28} />
</a>

                </div>
              </div>
              
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 rounded-[3rem] transition-opacity duration-700 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
