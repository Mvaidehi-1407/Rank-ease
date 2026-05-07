import { useState, useEffect } from 'react';
import PredictorControls from '../components/PredictorControls';
import VisualIntelligenceSuite from '../components/VisualIntelligenceSuite';
import CollegeCard from '../components/CollegeCard';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PredictorHub() {
  const [filters, setFilters] = useState({
    rank: 5000,
    category: 'OC',
    branch: 'CSE',
    region: 'OU',
    gender: 'Boys'
  });

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch predictions');
        }

        setColleges(data);
      } catch (error) {
        console.error("Failed to fetch predictions:", error);
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

                {!loading && colleges.length === 0 && (
                  <div className="col-span-full py-12 text-center text-textMuted glass-panel rounded-2xl">
                    No colleges found matching these exact criteria. Try adjusting your rank or branch.
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
