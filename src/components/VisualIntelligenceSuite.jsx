import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

const COLORS = ['#10B981', '#EAB308', '#EF4444']; // Safe, Target, Dream

export default function VisualIntelligenceSuite({ colleges }) {
  if (!colleges || colleges.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-textMuted p-10 glass-panel rounded-2xl">
        Adjust filters to see visual intelligence data.
      </div>
    );
  }

  // 1. Doughnut/Pie Data: Breakdown of Categories
  const safeCount = colleges.filter(c => c.status === 'Safe').length;
  const targetCount = colleges.filter(c => c.status === 'Target').length;
  const dreamCount = colleges.filter(c => c.status === 'Dream').length;

  const pieData = [
    { name: 'Safe', value: safeCount },
    { name: 'Target', value: targetCount },
    { name: 'Dream', value: dreamCount },
  ];

  // 2. Area Line Data: Cutoffs vs Probability
  const areaData = colleges.slice(0, 8).map(c => ({
    name: c.Name.substring(0, 10) + '...',
    cutoff: c.LastRank,
    probability: c.probability
  }));

  // 3. Radar Data: Top College Comparison
  const topColleges = colleges.slice(0, 2);
  const radarData = [
    { subject: 'ROI', A: topColleges[0]?.ROI || 0, B: topColleges[1]?.ROI || 0, fullMark: 100 },
    { subject: 'Placements', A: topColleges[0]?.Placements || 0, B: topColleges[1]?.Placements || 0, fullMark: 100 },
    { subject: 'Faculty', A: topColleges[0]?.Faculty || 0, B: topColleges[1]?.Faculty || 0, fullMark: 100 },
    { subject: 'Campus Life', A: topColleges[0]?.CampusLife || 0, B: topColleges[1]?.CampusLife || 0, fullMark: 100 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full"
    >
      {/* Chart 1: Probability Distribution */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col">
        <h3 className="font-bold text-sm mb-4 text-textMuted uppercase tracking-wider">Outcome Distribution</h3>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A2235', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: College Comparison Radar */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col">
        <h3 className="font-bold text-sm mb-4 text-textMuted uppercase tracking-wider">Top 2 Comparison</h3>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              {topColleges[0] && (
                <Radar name={topColleges[0].Name.substring(0,15)} dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
              )}
              {topColleges[1] && (
                <Radar name={topColleges[1].Name.substring(0,15)} dataKey="B" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.4} />
              )}
              <Tooltip contentStyle={{ backgroundColor: '#1A2235', border: 'none', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Cutoff Trends Area */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:col-span-2 lg:col-span-1">
        <h3 className="font-bold text-sm mb-4 text-textMuted uppercase tracking-wider">Cutoff Landscape</h3>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCutoff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A2235', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="cutoff" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCutoff)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
