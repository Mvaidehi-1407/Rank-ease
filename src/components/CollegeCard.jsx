import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users, Building, AlertCircle, CheckCircle2 } from 'lucide-react';

function CollegeCardContent({ college }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Determine border color based on status
  const getBorderColor = () => {
    if (college.status === 'Safe') return 'border-accent'; // Green
    if (college.status === 'Target') return 'border-yellow-500'; // Yellow
    return 'border-red-500'; // Dream
  };

  const getStatusIcon = () => {
    if (college.status === 'Safe') return <CheckCircle2 className="w-5 h-5 text-accent" />;
    if (college.status === 'Target') return <TrendingUp className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  if (!college) return null;

  // Select a stable campus image based on college ID or name length for variety.
  const collegeName = college.Name || 'College';
  const imageIndex = ((college.id || collegeName.length) % 2) + 1;
  const imageSrc = `/campus${imageIndex}.png`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
      className="relative w-full h-[380px] perspective-1000 cursor-pointer group hover:-translate-y-2 transition-transform duration-300"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`${collegeName} college details`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsFlipped((current) => !current);
        }
      }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front of Card */}
        <div className={`absolute inset-0 w-full h-full backface-hidden glass-panel rounded-2xl overflow-hidden border-t-4 ${getBorderColor()} flex flex-col`}>
          <div className="h-40 w-full relative">
            <img src={imageSrc} alt={collegeName} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
              <span className="px-2 py-1 bg-surface/80 backdrop-blur-sm rounded text-xs font-bold border border-white/10">
                {college.Branch}
              </span>
              <div className="flex items-center gap-1 bg-background/90 px-2 py-1 rounded border border-white/10">
                {getStatusIcon()}
                <span className="font-bold text-sm">{college.status}</span>
              </div>
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">{collegeName}</h3>
              <div className="flex items-center text-textMuted text-xs gap-1 mb-4">
                <MapPin className="w-3 h-3" />
                {college.Location}
              </div>
            </div>

            <div className="flex justify-between items-center bg-surface p-3 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-textMuted uppercase tracking-wider font-bold">Admission Prob.</span>
                <span className="text-2xl font-black text-white">{college.probability}%</span>
              </div>
              
              <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-bold"
                style={{ borderColor: college.status === 'Safe' ? '#10B981' : college.status === 'Target' ? '#EAB308' : '#EF4444' }}
              >
                {college.LastRank}
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card (Flipped) */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden glass-panel rounded-2xl border-t-4 ${getBorderColor()} p-6 flex flex-col`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">AI Analysis</h3>
          
          <p className="text-sm text-gray-300 leading-relaxed italic mb-6 flex-1">
            "{college.aiReasoning}"
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-surface p-2 rounded border border-white/5 flex flex-col">
              <span className="text-textMuted flex items-center gap-1"><TrendingUp className="w-3 h-3"/> ROI Score</span>
              <span className="font-bold text-lg">{college.ROI}/100</span>
            </div>
            <div className="bg-surface p-2 rounded border border-white/5 flex flex-col">
              <span className="text-textMuted flex items-center gap-1"><Building className="w-3 h-3"/> Placements</span>
              <span className="font-bold text-lg">{college.Placements}/100</span>
            </div>
            <div className="bg-surface p-2 rounded border border-white/5 flex flex-col">
              <span className="text-textMuted flex items-center gap-1"><Users className="w-3 h-3"/> Faculty</span>
              <span className="font-bold text-lg">{college.Faculty}/100</span>
            </div>
            <div className="bg-surface p-2 rounded border border-white/5 flex flex-col">
              <span className="text-textMuted">Available Seats</span>
              <span className="font-bold text-lg">{college.Seats}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
const CollegeCard = memo(CollegeCardContent, (prevProps, nextProps) => {
  return prevProps.college?.id === nextProps.college?.id;
});

CollegeCard.displayName = 'CollegeCard';

export default CollegeCard;
