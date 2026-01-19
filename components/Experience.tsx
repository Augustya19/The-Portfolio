
import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';
import { Briefcase, Database } from 'lucide-react';

const experiences: (ExperienceItem & { icon: any })[] = [
  {
    period: 'JUNE 2025 - JULY 2025',
    title: 'Management Trainee',
    company: 'LEARNING ROUTES',
    icon: Briefcase,
    description: [
    'Supported sales and operations teams by managing leads, maintaining client databases, and improving follow-up processes.',
    'Worked closely with senior managers to understand business workflows, sales pipelines, and customer retention strategies.',
    ' Developed strong communication, negotiation, and CRM tool skills through cross-functional collaboration.'
    ]
  },
  {
    period: 'MAY 2024 - JULY 2024',
    title: 'Data Science Intern',
    company: 'CELEBAL TECHNOLOGIES',
    icon: Database,
    description: ['Led the development of a CNN-based image classification model, achieving 92% accuracy across 10,000+ images.',' Improved model performance by 30% through effective data preprocessing and augmentation, aligning technical outcomes with stakeholder requirements.',' Conducted predictive modeling for house price estimation, delivering an 84.73% improvement in accuracy and demonstrating strong analytical and problem-solving skills.']
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-40 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-600 uppercase mb-4 block">Timeline</span>
          <h2 className="font-serif text-5xl md:text-6xl text-indigo-950">Professional Journey</h2>
        </div>
        
        <div className="space-y-10 relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-stone-200 hidden md:block"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative md:pl-20"
            >
              <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm z-10 hidden md:block group-hover:scale-150 transition-transform duration-300"></div>
              
              <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p- bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                          <exp.icon size={20} />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-indigo-600/60 uppercase">
                          {exp.period}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl text-indigo-950 mb-6 group-hover:text-indigo-600 transition-colors">{exp.title}</h3>
                    <p className="text-stone-500 leading-relaxed text-40 font-medium space-y-2">
                      {exp.description.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}     
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
