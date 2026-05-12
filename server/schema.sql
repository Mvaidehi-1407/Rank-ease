/**
 * Database Schema and Indexes
 * SQL file to initialize database with proper structure and indexes
 */

-- Create colleges table with proper structure
CREATE TABLE IF NOT EXISTS colleges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  Location TEXT,
  Branch TEXT NOT NULL,
  Category TEXT NOT NULL,
  Gender TEXT,
  Region TEXT NOT NULL,
  LastRank INTEGER,
  ROI REAL,
  Placements REAL,
  Faculty REAL,
  Seats INTEGER,
  CampusLife REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common query patterns
-- Index for prediction queries (Branch, Category, Region)
CREATE INDEX IF NOT EXISTS idx_colleges_branch_category_region 
ON colleges(Branch, Category, Region);

-- Index for LastRank queries (used in ranking)
CREATE INDEX IF NOT EXISTS idx_colleges_lastrank 
ON colleges(LastRank);

-- Index for combined searches
CREATE INDEX IF NOT EXISTS idx_colleges_branch_lastrank 
ON colleges(Branch, LastRank);

-- Index for region-based filtering
CREATE INDEX IF NOT EXISTS idx_colleges_region_branch 
ON colleges(Region, Branch);

-- Index for location searches
CREATE INDEX IF NOT EXISTS idx_colleges_location 
ON colleges(Location);

-- Create log table for tracking API requests (optional)
CREATE TABLE IF NOT EXISTS api_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endpoint TEXT,
  method TEXT,
  status_code INTEGER,
  response_time_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on API logs for time-based queries
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at 
ON api_logs(created_at);

-- Enable WAL mode for better concurrency
PRAGMA journal_mode = WAL;

-- Optimize for faster reads
PRAGMA synchronous = NORMAL;
