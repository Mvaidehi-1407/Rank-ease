import { motion } from 'framer-motion';
import { SlidersHorizontal, Settings2 } from 'lucide-react';

export default function PredictorControls({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-6 rounded-2xl flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <Settings2 className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Simulator Controls</h2>
      </div>

      <div className="space-y-6 flex-1">
        {/* Rank Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-textMuted">EAMCET Rank</label>
            <span className="text-lg font-bold text-white bg-surface px-3 py-1 rounded-md border border-white/5">
              {filters.rank}
            </span>
          </div>
          <input
            type="range"
            name="rank"
            min="100"
            max="150000"
            step="100"
            value={filters.rank}
            onChange={handleChange}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-textMuted mt-1">
            <span>100</span>
            <span>150k</span>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Category</label>
          <select 
            name="category" 
            value={filters.category} 
            onChange={handleChange}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
          >
            <option value="OC">OC</option>
            <option value="BC-A">BC-A</option>
            <option value="BC-B">BC-B</option>
            <option value="BC-C">BC-C</option>
            <option value="BC-D">BC-D</option>
            <option value="BC-E">BC-E</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>

        {/* Branch Dropdown */}
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Branch</label>
          <select 
            name="branch" 
            value={filters.branch} 
            onChange={handleChange}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>

        {/* Region & Gender Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Region</label>
            <select 
              name="region" 
              value={filters.region} 
              onChange={handleChange}
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="OU">OU</option>
              <option value="AU">AU</option>
              <option value="SVU">SVU</option>
              <option value="Non-Local">Non-Local</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Gender</label>
            <select 
              name="gender" 
              value={filters.gender} 
              onChange={handleChange}
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="Boys">Boys/Co-Ed</option>
              <option value="Girls">Girls Only</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
        <SlidersHorizontal className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-textMuted leading-relaxed">
          The simulator provides real-time predictions. Adjusting the rank instantly updates the Visual Intelligence Suite and your College Matches.
        </p>
      </div>
    </motion.div>
  );
}
