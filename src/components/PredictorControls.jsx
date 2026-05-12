import { motion } from 'framer-motion';
import { Settings2 } from 'lucide-react';
import { CATEGORIES_ARRAY, BRANCHES_ARRAY, REGIONS_ARRAY, GENDERS_ARRAY, FORM_CONSTRAINTS } from '../constants.js';

export default function PredictorControls({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'rank' ? Number(value) : value }));
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
            <label htmlFor="rank" className="text-sm font-medium text-textMuted">EAMCET Rank</label>
            <span className="text-lg font-bold text-white bg-surface px-3 py-1 rounded-md border border-white/5">
              {filters.rank}
            </span>
          </div>
          <input
            id="rank"
            type="range"
            name="rank"
            min={FORM_CONSTRAINTS.RANK_MIN}
            max={FORM_CONSTRAINTS.RANK_MAX}
            step={FORM_CONSTRAINTS.RANK_STEP}
            value={filters.rank}
            onChange={handleChange}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="EAMCET Rank"
            aria-valuenow={filters.rank}
            aria-valuemin={FORM_CONSTRAINTS.RANK_MIN}
            aria-valuemax={FORM_CONSTRAINTS.RANK_MAX}
          />
          <div className="flex justify-between text-xs text-textMuted mt-1">
            <span>{FORM_CONSTRAINTS.RANK_MIN.toLocaleString()}</span>
            <span>{FORM_CONSTRAINTS.RANK_MAX.toLocaleString()}</span>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-textMuted mb-2">Category</label>
          <select 
            id="category"
            name="category" 
            value={filters.category} 
            onChange={handleChange}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            aria-label="Select category"
          >
            {CATEGORIES_ARRAY.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Branch Dropdown */}
        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-textMuted mb-2">Branch</label>
          <select 
            id="branch"
            name="branch" 
            value={filters.branch} 
            onChange={handleChange}
            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            aria-label="Select branch"
          >
            {BRANCHES_ARRAY.map(branch => (
              <option key={branch.value} value={branch.value}>{branch.label}</option>
            ))}
          </select>
        </div>

        {/* Region & Gender Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-textMuted mb-2">Region</label>
            <select 
              id="region"
              name="region" 
              value={filters.region} 
              onChange={handleChange}
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              aria-label="Select region"
            >
              {REGIONS_ARRAY.map(region => (
                <option key={region.value} value={region.value}>{region.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-textMuted mb-2">Gender</label>
            <select 
              id="gender"
              name="gender" 
              value={filters.gender} 
              onChange={handleChange}
              className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              aria-label="Select gender"
            >
              {GENDERS_ARRAY.map(gender => (
                <option key={gender.value} value={gender.value}>{gender.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
        <Settings2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-textMuted leading-relaxed">
          The simulator provides real-time predictions. Adjusting the rank instantly updates the Visual Intelligence Suite and your College Matches.
        </p>
      </div>
    </motion.div>
  );
}
