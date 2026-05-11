import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Sparkles,
  BarChart2,
  Activity,
  School,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Bookmark,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

import clsx from 'clsx';

export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/home', icon: Activity },
    { name: 'Simulation', path: '/predictor', icon: Sparkles },
    { name: 'Trends', path: '/predictor', icon: BarChart2 },
    { name: 'Colleges', path: '/predictor', icon: School },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10 px-8 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link to="/home" className="flex items-center gap-3 group">

            <motion.div
              whileHover={{ rotate: 10, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <BrainCircuit className="w-5 h-5 text-white" />
            </motion.div>

            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-wide text-white">
                RankWise AI
              </span>
              <span className="text-[10px] uppercase tracking-[4px] text-textMuted">
                Smart Predictor
              </span>
            </div>

          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">

            {links.map((link) => {

              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'relative flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-white py-2',
                    isActive ? 'text-primary' : 'text-textMuted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                    />
                  )}

                </Link>
              );
            })}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATION */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            className="hidden md:flex w-11 h-11 rounded-2xl bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition"
          >
            <Bell className="w-4 h-4 text-white" />
          </motion.button>

          {/* PROFILE */}
          <div className="relative">

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-white/5 transition-all"
            >

              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/40">

                <img
                  src="https://api.dicebear.com/7.x/adventurer/png?seed=Vaidehi"
                  alt="profile"
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-white">Vaidehi</span>
                <span className="text-[11px] text-textMuted">AI Explorer</span>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-textMuted transition-transform duration-300 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />

            </motion.button>

            {/* DROPDOWN */}
            <AnimatePresence>

              {isProfileOpen && (

                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  className="absolute right-0 mt-4 w-72 rounded-3xl overflow-hidden border border-white/10 bg-black/70 backdrop-blur-2xl shadow-2xl z-50"
                >

                  <div className="py-2">

                    {/* PROFILE */}
                    <button onClick={() => handleNavigate('/profile')}
                      className="px-5 py-3 flex gap-3 text-textMuted hover:text-white hover:bg-white/5 w-full text-left">
                      <User className="w-4 h-4" /> Profile
                    </button>

                    {/* SETTINGS */}
                    <button onClick={() => handleNavigate('/settings')}
                      className="px-5 py-3 flex gap-3 text-textMuted hover:text-white hover:bg-white/5 w-full text-left">
                      <Settings className="w-4 h-4" /> Settings
                    </button>

                    {/* 🔥 ADDED ROUTES */}
                    <button onClick={() => handleNavigate('/saved-colleges')}
                      className="px-5 py-3 flex gap-3 text-textMuted hover:text-white hover:bg-white/5 w-full text-left">
                      <Bookmark className="w-4 h-4" /> Saved Colleges
                    </button>

                    <button onClick={() => handleNavigate('/privacy')}
                      className="px-5 py-3 flex gap-3 text-textMuted hover:text-white hover:bg-white/5 w-full text-left">
                      <ShieldCheck className="w-4 h-4" /> Privacy Center
                    </button>

                  </div>

                  {/* LOGOUT */}
                  <div className="border-t border-white/10 p-2">

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        localStorage.removeItem('isLoggedIn'); // reset auth
                        navigate('/login'); // ✅ FIXED
                      }}
                      className="px-4 py-3 flex gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </nav>
  );
}
