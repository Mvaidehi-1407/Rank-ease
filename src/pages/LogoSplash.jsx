import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const particles = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  delay: index * 0.3,
  duration: 5 + index,
  drift: ((index * 37) % 100) - 50,
  left: `${(index * 23) % 100}%`
}));

export default function LogoSplash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center">

      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-100, -500],
            x: [0, particle.drift],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: particle.left,
            bottom: '-20px',
          }}
        />
      ))}

      {/* Main Logo Section */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Rotating Glow Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-56 h-56 rounded-full border border-primary/30"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-72 h-72 rounded-full border border-secondary/20"
        />

        {/* Logo Circle */}
        <motion.div
          initial={{
            scale: 0,
            rotate: -180,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
            type: 'spring',
            stiffness: 120,
          }}
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary via-secondary to-blue-500 p-[3px] shadow-[0_0_60px_rgba(59,130,246,0.5)]"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full rounded-full bg-[#0b1120] flex items-center justify-center overflow-hidden"
          >
            <img
              src="/logo.png"
              alt="RankEase Logo"
              className="w-24 h-24 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 1,
          }}
          className="mt-10 text-6xl md:text-7xl font-black tracking-[0.25em]"
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-primary bg-clip-text text-transparent">
            RANKEASE
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 text-textMuted text-lg tracking-widest uppercase"
        >
          AI Powered College Prediction Platform
        </motion.p>

        {/* Loading Bar */}
        <div className="mt-12 w-72 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
            }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>

      </div>
    </div>
  );
}
