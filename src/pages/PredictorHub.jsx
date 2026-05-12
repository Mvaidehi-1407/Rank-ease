import { useState, useEffect } from 'react';
import PredictorControls from '../components/PredictorControls';
import VisualIntelligenceSuite from '../components/VisualIntelligenceSuite';
import CollegeCard from '../components/CollegeCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getPredictions } from '../services/api.js';
import { DEFAULT_FILTERS, ERROR_MESSAGES } from '../constants.js';

export default function PredictorHub() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getPredictions(filters);

        if (result.success) {
          setColleges(result.data || []);
        } else {
          setError(result.error || ERROR_MESSAGES.SERVER_ERROR);
          setColleges([]);
        }
      } catch (err) {
        console.error("Failed to fetch predictions:", err);
        setError(ERROR_MESSAGES.NETWORK_ERROR);
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12 pt-6">
      <div className="max-w-1600 mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2 tracking-tight">
            Predictor Hub
          </h1>
          <p className="text-textMuted">
            Adjust your parameters to simulate EAMCET outcomes in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Controls */}
          <div className="lg:col-span-3">
            <PredictorControls filters={filters} setFilters={setFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-9 flex flex-col gap-8">

            <div className="w-full">
              <VisualIntelligenceSuite colleges={colleges} />
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                Intelligent Matches
                {loading && (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                )}
              </h2>

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-200 mb-1">Unable to Load Predictions</h3>
                    <p className="text-sm text-red-200/80">{error}</p>
                  </div>
                </motion.div>
              )}

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {colleges.map((college, index) => (
                    <CollegeCard
                      key={college.id || index}
                      college={college}
                    />
                  ))}
                </AnimatePresence>

                {!loading && !error && colleges.length === 0 && (
                  <div className="col-span-full py-12 text-center text-textMuted glass-panel rounded-2xl">
                    <p className="mb-2">No colleges found matching these exact criteria.</p>
                    <p className="text-sm">Try adjusting your rank or branch.</p>
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
