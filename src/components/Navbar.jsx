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
  ChevronDown
} from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Simulation', path: '/predictor', icon: Sparkles },
    { name: 'Trends', path: '/predictor', icon: BarChart2 },
    { name: 'Colleges', path: '/predictor', icon: School },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <span className="text-xl font-bold text-white">
            RankWise AI
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-white relative py-2",
                  isActive ? "text-primary" : "text-textMuted"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 h-0.5 bg-primary w-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:bg-white/5 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-secondary to-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>

            <ChevronDown className="w-4 h-4 text-textMuted" />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 rounded-xl glass-panel border border-white/10 shadow-2xl py-2 flex flex-col z-50"
              >

                {/* PROFILE */}
                <button
                  onClick={() => handleNavigate('/profile')}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-textMuted hover:text-white hover:bg-white/5 w-full text-left"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {/* SETTINGS */}
                <button
                  onClick={() => handleNavigate('/settings')}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-textMuted hover:text-white hover:bg-white/5 w-full text-left"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <div className="h-px bg-white/10 my-1 w-full" />

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </nav>
  );
}