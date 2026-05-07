import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
  const { message, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are the RankWise AI Assistant, an expert academic counselor for EAMCET admissions. 
You are currently helping a student who has the following simulator context:
Rank: ${context.rank}, Category: ${context.category}, Branch: ${context.branch}, Region: ${context.region}.
Keep your responses very concise (1-2 short paragraphs), professional, and encouraging. Use bullet points if listing facts.
Do not hallucinate data. If asked about a specific college not in your knowledge, say you are checking the latest database.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response from AI.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
