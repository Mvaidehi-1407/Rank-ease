import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I am RankWise AI. How can I help you navigate your college admissions today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    const context = {
      rank: 5000,
      category: 'OC',
      branch: 'CSE',
      region: 'OU'
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err) {
      setError(
        err.message === 'GEMINI_API_KEY is not set on the server.'
          ? 'Please set your GEMINI_API_KEY in backend environment.'
          : 'An error occurred while talking to the AI.'
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] z-40"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-380 h-600 max-h-[80vh] bg-linear-to-r from-primary to-secondary glass-panel rounded-2xl flex flex-col z-50 overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-surface/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">
                    RankWise Assistant
                  </h3>
                  <p className="text-xs text-textMuted flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-textMuted hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-secondary/20 text-white rounded-tr-none'
                        : 'bg-surface border border-white/10 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-3 rounded-2xl bg-surface border border-white/10 flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-white/10 bg-surface/50"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about colleges, trends..."
                  className="w-full bg-background border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-2 rounded-full bg-primary text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
