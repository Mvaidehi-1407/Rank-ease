import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, Zap } from 'lucide-react';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Futuristic Education" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <SparklesIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-textMuted">Introducing RankWise AI 2.0</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
                Predicting
              </span> your success through data.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-textMuted mb-10 max-w-3xl mx-auto leading-relaxed">
              RankWise AI is the next-generation decision intelligence platform. Stop wondering where you'll land. Start simulating your academic future with 98% accuracy.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                to="/predictor"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-primary to-secondary text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
              >
                Launch Simulator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. App Intro Section */}
      <section className="w-full py-24 px-6 relative border-t border-white/5 bg-linear-to-b from-background to-surface/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            The Ultimate Admission Advantage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-textMuted leading-relaxed"
          >
            Navigating college admissions shouldn't be a guessing game. RankWise utilizes millions of historical data points, real-time seat tracking, and advanced machine learning to simulate your EAMCET outcomes. Get matched with your Dream, Target, and Safe colleges instantly.
          </motion.p>
        </div>
      </section>

      {/* 3. App Features / Flashcards Section */}
      <section className="w-full pb-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              image="/feature1.png"
              icon={<Brain />}
              title="Predictive Analytics"
              desc="Our ML model analyzes 5+ years of historical EAMCET cutoffs to instantly calculate your precise admission probability."
              delay={0.2}
            />
            <FeatureCard 
              image="/feature2.png"
              icon={<Target />}
              title="Intelligent Matching"
              desc="Automatically bucket colleges into Safe, Target, and Dream categories with tailored AI reasoning for each."
              delay={0.4}
            />
            <FeatureCard 
              image="/hero.png"
              icon={<Zap />}
              title="Real-Time Simulator"
              desc="Adjust your rank, category, and region on the fly. Watch as dynamic charts and flashcards re-sort instantly."
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ image, icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30"
    >
      <div className="h-48 w-full relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-#1e293b to-transparent" />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-primary shadow-lg">
          {icon}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col bg-surface/40">
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-textMuted leading-relaxed text-sm flex-1">{desc}</p>
      </div>
    </motion.div>
  );
}

function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
