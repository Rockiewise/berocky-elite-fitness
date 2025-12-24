
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => h.role === 'user' ? { role: 'user', parts: [{ text: h.text }] } : { role: 'model', parts: [{ text: h.text }] }),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "You are 'Rocky AI', the elite personal trainer for BeRocky Gym in Ibadan, Nigeria. You are motivating, professional, and knowledgeable about bodybuilding, nutrition, and general fitness. Keep answers concise and energetic. Use Nigerian context where appropriate (e.g. mention local foods like Amala, Jollof for nutrition advice).",
          temperature: 0.7,
        }
      });

      const aiText = response.text;
      setHistory(prev => [...prev, { role: 'model', text: aiText || "Sorry, my gears jammed. Try again, champ!" }]);
    } catch (err) {
      console.error(err);
      setHistory(prev => [...prev, { role: 'model', text: "Connection to the iron paradise lost. Check your network!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-90"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="w-80 md:w-96 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[500px] animate-in slide-in-from-bottom-4">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-950 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black">R</div>
              <div>
                <h4 className="text-sm font-bold heading-font uppercase">Rocky AI Coach</h4>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Always Ready</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth"
          >
            {history.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm italic">"Ask me about your workout, diet, or how to get started today!"</p>
              </div>
            )}
            {history.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  chat.role === 'user' 
                    ? 'bg-red-600 text-white rounded-br-none' 
                    : 'bg-zinc-800 text-gray-300 rounded-bl-none'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3 rounded-2xl text-gray-300 rounded-bl-none">
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Rocky..."
                className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-red-600 p-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
