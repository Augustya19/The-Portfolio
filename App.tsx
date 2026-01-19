
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Work from './components/Work';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Archive from './components/Archive';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'archive'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavigateHome = () => setView('home');
  const handleNavigateArchive = () => setView('archive');

  return (
    <div className="relative selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onHomeClick={handleNavigateHome} />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <div key="home">
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Work onBrowseArchive={handleNavigateArchive} />
              <Playground />
              <Contact />
            </main>
          </div>
        ) : (
          <Archive key="archive" onBack={handleNavigateHome} />
        )}
      </AnimatePresence>
      
      <footer className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
            onClick={handleNavigateHome}
            className="font-serif text-2xl font-bold text-indigo-950 cursor-pointer"
          >
            augustya<span className="text-indigo-600">.</span>
          </div>
          <div className="flex gap-10 text-stone-400 font-bold text-[10px] tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">© {new Date().getFullYear()}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
