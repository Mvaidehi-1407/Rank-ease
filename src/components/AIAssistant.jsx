import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Loader2,
  Send,
  Sparkles,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const trendData = [
  { year: '2022', cutoff: 1800 },
  { year: '2023', cutoff: 2400 },
  { year: '2024', cutoff: 3200 },
  { year: '2025', cutoff: 4100 }
];

const welcomeMessage = `Hello!

I am RankWise AI.

I can help you with:

- College Predictions
- EAMCET Counselling
- Cutoff Analysis
- ROI & Placements
- Branch Comparisons
- Career Guidance
- Generic Conversations

Try asking:

"Best colleges for 5000 rank"

or

"Will CSE cutoff increase?"`;

const shouldShowGraph = (text) => {
  const query = text.toLowerCase();

  return (
    query.includes('cutoff') ||
    query.includes('trend') ||
    query.includes('increase') ||
    query.includes('decrease') ||
    query.includes('analysis') ||
    query.includes('placement') ||
    query.includes('roi')
  );
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: welcomeMessage
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage
      }
    ]);

    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      const aiReply = data.reply || data.text || data.error || 'Unable to generate response.';

      if (!response.ok) {
        throw new Error(aiReply);
      }

      setIsBackendOnline(true);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: aiReply,
          graph: shouldShowGraph(userMessage)
        }
      ]);
    } catch {
      setIsBackendOnline(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Backend not connected.

Make sure:

- Backend server is running
- rankwise.db exists
- Port 3001 is active
- Vite proxy is forwarding /api requests`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-blue-500 text-white shadow-[0_0_45px_rgba(59,130,246,0.45)] md:bottom-6 md:right-6"
      >
        <Sparkles className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-3 z-50 flex h-[80vh] w-[95vw] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black/30 shadow-[0_0_80px_rgba(0,0,0,0.55)] backdrop-blur-3xl sm:w-[430px] md:right-6 lg:w-[470px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
            </div>

            <div className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
                    <BrainCircuit className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">RankWise AI</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isBackendOnline ? 'animate-pulse bg-green-400' : 'bg-yellow-400'
                        }`}
                      />
                      {isBackendOnline ? 'Online' : 'Backend offline'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="relative z-10 flex-1 space-y-5 overflow-y-auto px-4 py-5">
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] whitespace-pre-line rounded-3xl border px-5 py-4 text-sm leading-relaxed backdrop-blur-xl ${
                      msg.role === 'user'
                        ? 'rounded-br-md border-primary/20 bg-primary/20 text-white'
                        : 'rounded-bl-md border-white/10 bg-white/5 text-gray-200'
                    }`}
                  >
                    {msg.text}

                    {msg.graph && (
                      <div className="mt-5 h-72 rounded-3xl border border-white/10 bg-black/20 p-4">
                        <div className="mb-4 flex items-center gap-2 font-semibold text-white">
                          <TrendingUp className="h-4 w-4" />
                          Cutoff Trend Analysis
                        </div>

                        <ResponsiveContainer width="100%" height="85%">
                          <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                            <defs>
                              <linearGradient id="assistantColorCutoff" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="year" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" width={44} />
                            <Tooltip
                              contentStyle={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '12px'
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="cutoff"
                              stroke="#3b82f6"
                              fillOpacity={1}
                              fill="url(#assistantColorCutoff)"
                              strokeWidth={3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>

                  <div className="rounded-3xl rounded-bl-md border border-white/10 bg-white/5 px-5 py-4 text-white">
                    Thinking intelligently...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="relative z-10 border-t border-white/10 bg-white/5 p-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about colleges, cutoffs, placements..."
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-5 pr-16 text-white placeholder:text-gray-400 focus:border-primary focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
