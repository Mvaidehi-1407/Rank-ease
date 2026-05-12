/**
 * Loading Skeleton Components
 * Placeholder components shown while data is loading
 */

import { motion } from 'framer-motion';

/**
 * Skeleton for college card
 */
export function CollegeCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[380px]"
    >
      {/* Image placeholder */}
      <div className="h-40 w-full bg-surface/50 animate-pulse" />

      {/* Content placeholder */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="h-6 bg-surface/50 rounded w-3/4 mb-3 animate-pulse" />
        <div className="h-4 bg-surface/50 rounded w-1/2 mb-4 animate-pulse" />

        {/* Stats placeholder */}
        <div className="mt-auto">
          <div className="flex justify-between items-center bg-surface p-3 rounded-xl">
            <div className="flex flex-col">
              <div className="h-3 bg-surface/50 rounded w-20 mb-2 animate-pulse" />
              <div className="h-6 bg-surface/50 rounded w-16 animate-pulse" />
            </div>
            <div className="w-12 h-12 rounded-full bg-surface/50 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Skeleton for chart container
 */
export function ChartSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel p-5 rounded-2xl h-[300px]"
    >
      <div className="h-4 bg-surface/50 rounded w-32 mb-4 animate-pulse" />
      <div className="flex-1 flex items-end gap-2">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-surface/50 rounded-t animate-pulse"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Skeleton for college grid
 */
export function CollegeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for predictor controls
 */
export function PredictorControlsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel p-6 rounded-2xl"
    >
      {/* Header */}
      <div className="h-6 bg-surface/50 rounded w-40 mb-6 animate-pulse" />

      {/* Sliders and dropdowns */}
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-surface/50 rounded w-24 mb-3 animate-pulse" />
            <div className="h-10 bg-surface/50 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Generic skeleton loading state
 */
export function SkeletonLoader({ width = 'w-full', height = 'h-20', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${width} ${height} bg-surface/50 rounded-lg animate-pulse ${className}`}
    />
  );
}

export default {
  CollegeCardSkeleton,
  ChartSkeleton,
  CollegeGridSkeleton,
  PredictorControlsSkeleton,
  SkeletonLoader
};
