import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const extractRank = (message) => {
  const match = message.match(/\b\d{3,6}\b/);
  return match ? Number(match[0]) : null;
};

const buildLocalAssistantReply = (message, relatedColleges = []) => {
  const query = message.toLowerCase();

  if (relatedColleges.length > 0) {
    const collegeList = relatedColleges
      .slice(0, 5)
      .map((college) => `${college.Name} (${college.Branch}, cutoff ${college.LastRank}, ${college.Location})`)
      .join('\n- ');

    return `Based on the current RankWise database, these are relevant options:\n\n- ${collegeList}\n\nUse the Predictor Hub filters for a tighter category, region, and gender match.`;
  }

  if (query.includes('cutoff') || query.includes('trend')) {
    return 'Cutoffs usually move with seat count, branch demand, category, region, and counselling round behavior. CSE and IT tend to stay competitive, while ECE can be a strong target if your rank is near the previous closing rank.';
  }

  if (query.includes('placement') || query.includes('roi')) {
    return 'For ROI and placements, compare college fees, median package, branch strength, and location. Government colleges and strong Hyderabad private colleges often score well in the RankWise dataset.';
  }

  return 'I can help with college prediction, EAMCET counselling, branch comparison, cutoff trends, ROI, placements, and general career questions. Share your rank, category, preferred branch, and region for a more specific answer.';
};

const getRelatedColleges = (message) => {
  const rank = extractRank(message);
  const upperMessage = message.toUpperCase();
  const branches = ['CSE', 'ECE', 'IT', 'EEE', 'MECH', 'CIVIL'];
  const branch = branches.find((candidate) => upperMessage.includes(candidate));

  if (!rank && !branch) return [];

  const filters = [];
  const params = {};

  if (branch) {
    filters.push('Branch = @branch');
    params.branch = branch;
  }

  if (rank) {
    filters.push('LastRank >= @rank - 5000');
    params.rank = rank;
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const orderClause = rank ? 'ORDER BY ABS(LastRank - @rank) ASC' : 'ORDER BY LastRank ASC';

  return db
    .prepare(
      `SELECT Name, Location, Branch, Category, Gender, Region, LastRank, ROI, Placements
       FROM colleges
       ${whereClause}
       ${orderClause}
       LIMIT 8`
    )
    .all(params);
};

// API to get predictions
app.post('/api/predict', (req, res) => {
  const { rank, category, gender, region, branch } = req.body;
  
  if (!rank || !category || !gender || !region || !branch) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Basic recommendation logic: 
    // We look for colleges where the cutoff for this category, region, and branch is near the user's rank.
    // In EAMCET, lower rank is better. So if user rank <= cutoff, it's a good chance.
    
    const stmt = db.prepare(`
      SELECT * FROM colleges
      WHERE Branch = ?
        AND Category = ?
        AND Region = ?
        AND (Gender = ? OR Gender = 'Boys')
      ORDER BY ABS(LastRank - ?) ASC
      LIMIT 10
    `);

    const colleges = stmt.all(branch, category, region, gender, rank);

    const results = colleges.map(college => {
      // Logic for admission probability
      // If cutoff > rank, high probability.
      // If cutoff < rank, lower probability depending on difference.
      const diff = college.LastRank - rank;
      let probability;
      let status;

      if (diff >= 5000) {
        probability = 95;
        status = 'Safe';
      } else if (diff >= 0 && diff < 5000) {
        probability = 80 + (diff / 5000) * 15;
        status = 'Safe';
      } else if (diff < 0 && diff > -5000) {
        probability = 50 + ((5000 + diff) / 5000) * 30; // diff is negative
        status = 'Target';
      } else if (diff <= -5000 && diff > -15000) {
        probability = 10 + ((15000 + diff) / 10000) * 40;
        status = 'Dream';
      } else {
        probability = 5;
        status = 'Dream';
      }

      return {
        ...college,
        probability: Math.round(probability),
        status,
        aiReasoning: status === 'Safe' 
          ? `Your rank (${rank}) is well within the historical cutoff (${college.LastRank}) for ${college.Category}. This is a highly likely admission.`
          : status === 'Target'
          ? `Your rank (${rank}) is close to the cutoff (${college.LastRank}). Fluctuations in seat availability make this a solid target.`
          : `This is a dream school. Your rank (${rank}) is above the typical cutoff (${college.LastRank}), but category shifts may provide an edge.`
      };
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// API to get aggregated trends data
app.get('/api/trends', (req, res) => {
  try {
    const stmt = db.prepare('SELECT Name, Branch, LastRank FROM colleges LIMIT 20');
    const trends = stmt.all();
    res.json(trends);
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
});

// API to interact with Gemini Chatbot
app.post('/api/chat', async (req, res) => {
  const { message = '', context = {} } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const relatedColleges = getRelatedColleges(message);
    const databaseContext =
      relatedColleges.length > 0
        ? relatedColleges
            .map((college) => `${college.Name}, ${college.Branch}, ${college.Category}, ${college.Region}, ${college.Gender}, cutoff ${college.LastRank}, ROI ${college.ROI}, placements ${college.Placements}`)
            .join('\n')
        : 'No direct database matches were found for this message.';

    if (!apiKey) {
      return res.json({
        reply: buildLocalAssistantReply(message, relatedColleges),
        source: 'local'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are the RankWise AI Assistant, an expert academic counselor for EAMCET admissions. 
You are currently helping a student who has the following simulator context:
Rank: ${context.rank || 'unknown'}, Category: ${context.category || 'unknown'}, Branch: ${context.branch || 'unknown'}, Region: ${context.region || 'unknown'}.
Current RankWise SQLite matches:
${databaseContext}
Keep your responses very concise (1-2 short paragraphs), professional, and encouraging. Use bullet points if listing facts.
Do not hallucinate data. If the database context is insufficient, say what details are needed.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ reply: response.text, text: response.text, source: 'gemini' });
  } catch (error) {
    console.error('Gemini API Error:', error);
    try {
      const relatedColleges = getRelatedColleges(message);
      res.json({
        reply: buildLocalAssistantReply(message, relatedColleges),
        source: 'local-fallback'
      });
    } catch (fallbackError) {
      console.error('Local fallback error:', fallbackError);
      res.status(500).json({ error: 'Failed to generate response from AI.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
