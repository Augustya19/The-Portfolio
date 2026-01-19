
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="connect" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-6 text-[11px] font-bold tracking-[0.3em] text-indigo-600 uppercase font-sans"
        >
          Contact
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-serif text-7xl md:text-8xl text-indigo-950 mb-12 tracking-tight"
        >
          Get in <span className="text-emerald-500 italic">touch.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-500 text-xl md:text-1xl mb-16 leading-relaxed font-medium font-sans"
        >
          Seeking collaborations in Product Management and Design. <br className="hidden md:block"/>
          Let's build something that makes sense.
        </motion.p>
        
        <motion.a 
          href="augustya13y@gmail.com"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-indigo-600 text-white px-14 py-6 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all mb-24 shadow-xl cursor-pointer font-sans"
        >
          Say Hello
        </motion.a>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {[
            { label: 'LinkedIn', icon: Linkedin, color: 'text-indigo-600', href: 'https://www.linkedin.com/in/augustyayv/' },
            { label: 'GitHub', icon: Github, color: 'text-stone-800', href: 'https://github.com/Augustya19' },
            { label: 'Resume', icon: FileText, color: 'text-emerald-600', href: '/resume.pdf' },
            { label: 'Mail', icon: Mail, color: 'text-rose-500', href: 'augustya13y@gmail.com' },
          ].map((link, i) => (
            <motion.a 
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`p-5 rounded-2xl bg-white shadow-sm border border-stone-100 group-hover:shadow-lg group-hover:-translate-y-2 transition-all duration-300 ${link.color}`}>
                <link.icon size={24} />
              </div>
              <span className="text-xs font-bold tracking-widest text-stone-400 uppercase group-hover:text-indigo-600 transition-colors font-sans">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
