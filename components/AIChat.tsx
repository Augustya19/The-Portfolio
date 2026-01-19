
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Augustya's AI twin. Ask me anything about his work, experience, or design philosophy!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite-latest',
        contents: userMsg,
        config: {
          systemInstruction: `You are Augustya's AI portfolio assistant. Augustya is a Computer Science grad into Product Management and Graphic Design. 
          Experience: Management Trainee at Learning Routes, Data Science Intern at Celebal Technologies. 
          Projects: AI Fitness Coach, Uber Fare Transparency study. 
          Tone: Professional, creative, helpful, and concise. 
          If asked something unrelated to Augustya, politely steer it back to his skills or work.`
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm not sure how to answer that, but Augustya definitely has an opinion on it!" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Oops, my circuits are a bit tangled. Try again in a second?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 md:w-96 glass rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] border border-stone-200"
          >
            <div className="p-4 bg-indigo-700 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span className="font-semibold tracking-tight">Augustya AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-600 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-700 text-white rounded-br-none' 
                      : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 p-3 rounded-2xl rounded-bl-none text-stone-400 animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-stone-100 bg-white/50 backdrop-blur-sm">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white border border-stone-200 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1.5 p-1.5 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:bg-indigo-800 transition-all flex items-center justify-center relative group"
      >
        <MessageSquare size={24} />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-indigo-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
          Chat with Augustya's AI
        </span>
      </motion.button>
    </div>
  );
};

export default AIChat;
