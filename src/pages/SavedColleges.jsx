import { useState } from 'react';
import { Bookmark, MapPin } from 'lucide-react';

export default function SavedColleges() {

  const [colleges] = useState([
    {
      id: 1,
      name: "JNTUH College of Engineering",
      location: "Hyderabad",
      branch: "CSE",
      category: "OC",
      rank: 1200,
      roi: 95,
      placements: 98,
      seats: 120
    },
    {
      id: 2,
      name: "CBIT - Chaitanya Bharathi",
      location: "Hyderabad",
      branch: "CSE",
      category: "OC",
      rank: 2100,
      roi: 90,
      placements: 95,
      seats: 180
    },
    {
      id: 3,
      name: "VNR Vignana Jyothi",
      location: "Hyderabad",
      branch: "CSE",
      category: "OC",
      rank: 2800,
      roi: 88,
      placements: 94,
      seats: 240
    }
  ]);

  return (
    <div className="min-h-screen px-6 py-10 text-white">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="text-primary" />
          <h1 className="text-3xl font-bold">Saved Colleges</h1>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {colleges.map((c) => (
            <div
              key={c.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition"
            >

              {/* NAME */}
              <h2 className="text-lg font-bold mb-2">
                {c.name}
              </h2>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-textMuted text-sm mb-3">
                <MapPin className="w-4 h-4" />
                {c.location}
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-textMuted">Branch</span>
                  <span>{c.branch}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-textMuted">Category</span>
                  <span>{c.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-textMuted">Rank</span>
                  <span className="text-primary font-bold">
                    {c.rank}
                  </span>
                </div>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">

                <div className="bg-white/5 p-2 rounded-lg">
                  ROI {c.roi}%
                </div>

                <div className="bg-white/5 p-2 rounded-lg">
                  PL {c.placements}%
                </div>

                <div className="bg-white/5 p-2 rounded-lg">
                  {c.seats} seats
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
