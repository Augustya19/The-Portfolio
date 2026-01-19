
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Globe, Framer, Code2, Database, Layout, PenTool, Workflow } from 'lucide-react';

const skillGroups = [
  {
    title: "Core Logic",
    subtitle: "Foundational Engineering",
    icon: Terminal,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    skills: ["Python", "MySQL", "Pandas", "Applied AI", "Gemini Services","Data Analysis", "Data Visualization"]
  },
  {
    title: "Web & Product",
    subtitle: "Development & Lifecycle",
    icon: Globe,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    skills: ["ReactJS", "NodeJS", "ExpressJS", "REST APIs", "HTML","CSS","Notion", "MS Excel"]
  },
  {
    title: "Design & Workflow",
    subtitle: "Creative Visualization",
    icon: Framer,
    color: "text-purple-600",
    bg: "bg-purple-50",
    skills: ["Adobe Illustrator", "Adobe Fresco", "Figma","Canva", "UI/UX", "GitHub","Visual Storytelling"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-25 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase mb-4 block">Capabilities</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a]">The Toolkit</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="p-8 rounded-[2rem] border border-stone-100 bg-indigo-50 hover:bg-indigo-90 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 group flex flex-col"
            >
              <div className="flex items-start mb-8">
                <div className={`p-4 ${group.bg} ${group.color} rounded-2xl group-hover:scale-10 transition-transform duration-500`}>
                  <group.icon size={24} />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-1">{group.title}</h3>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{group.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Subtle decorative line */}
        <div className="mt-24 flex justify-center">
          <div className="w-px h-16 bg-gradient-to-b from-stone-200 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
