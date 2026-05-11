import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Code2, Globe } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔐 Dummy credentials
  const DUMMY_EMAIL = 'admin@gmail.com';
  const DUMMY_PASSWORD = '1234';

  const handleLogin = () => {
    if (loading) return;

    setError('');
    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === DUMMY_EMAIL &&
        password === DUMMY_PASSWORD
      ) {
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/home', { replace: true });
      } else {
        setError('Invalid email or password');
      }

      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white relative overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-[380px] p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl z-10"
      >

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 text-sm mt-1 mb-6">
          Login to RankWise AI
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>

          <div className="flex items-center gap-2 mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
            <Mail size={16} className="text-gray-400" />

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Password</label>

          <div className="flex items-center gap-2 mt-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2">
            <Lock size={16} className="text-gray-400" />

            <input
              type="password"
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* LOGIN BUTTON */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary font-semibold shadow-lg hover:opacity-90 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>

        {/* DIVIDER */}
        <div className="flex items-center gap-2 my-5">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="flex gap-3">

          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Globe size={16} />
            Google
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Code2 size={16} />
            GitHub
          </button>

        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Demo login: admin@gmail.com / 1234
        </p>

      </motion.div>
    </div>
  );
}
