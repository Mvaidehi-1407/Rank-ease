import db from './db.js';

const seedData = [
  // CSE Top Tier
  { Name: 'JNTUH College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 1200, ROI: 95, Placements: 98, Faculty: 92, CampusLife: 90, Seats: 120 },
  { Name: 'JNTUH College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'BC-A', Gender: 'Boys', Region: 'OU', LastRank: 2500, ROI: 95, Placements: 98, Faculty: 92, CampusLife: 90, Seats: 30 },
  { Name: 'JNTUH College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'SC', Gender: 'Boys', Region: 'OU', LastRank: 8500, ROI: 95, Placements: 98, Faculty: 92, CampusLife: 90, Seats: 15 },
  { Name: 'JNTUH College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'ST', Gender: 'Boys', Region: 'OU', LastRank: 11000, ROI: 95, Placements: 98, Faculty: 92, CampusLife: 90, Seats: 10 },
  { Name: 'Osmania University College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 1050, ROI: 96, Placements: 97, Faculty: 95, CampusLife: 88, Seats: 60 },
  { Name: 'CBIT - Chaitanya Bharathi Institute of Technology', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 2100, ROI: 90, Placements: 95, Faculty: 88, CampusLife: 92, Seats: 180 },
  { Name: 'CBIT - Chaitanya Bharathi Institute of Technology', Location: 'Hyderabad', Branch: 'CSE', Category: 'BC-B', Gender: 'Girls', Region: 'OU', LastRank: 3800, ROI: 90, Placements: 95, Faculty: 88, CampusLife: 92, Seats: 60 },
  { Name: 'VNR Vignana Jyothi', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 2800, ROI: 88, Placements: 94, Faculty: 85, CampusLife: 85, Seats: 240 },
  { Name: 'VNR Vignana Jyothi', Location: 'Hyderabad', Branch: 'CSE', Category: 'SC', Gender: 'Girls', Region: 'OU', LastRank: 15500, ROI: 88, Placements: 94, Faculty: 85, CampusLife: 85, Seats: 60 },
  
  // ECE Top Tier
  { Name: 'JNTUH College of Engineering', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 2200, ROI: 92, Placements: 93, Faculty: 92, CampusLife: 90, Seats: 60 },
  { Name: 'Osmania University College of Engineering', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 1800, ROI: 94, Placements: 94, Faculty: 95, CampusLife: 88, Seats: 60 },
  { Name: 'CBIT - Chaitanya Bharathi Institute of Technology', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 3500, ROI: 85, Placements: 90, Faculty: 88, CampusLife: 92, Seats: 120 },
  { Name: 'Vasavi College of Engineering', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Girls', Region: 'OU', LastRank: 4200, ROI: 87, Placements: 92, Faculty: 90, CampusLife: 85, Seats: 120 },
  
  // Mid Tier CSE
  { Name: 'Gokaraju Rangaraju', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 4500, ROI: 82, Placements: 88, Faculty: 80, CampusLife: 80, Seats: 300 },
  { Name: 'Gokaraju Rangaraju', Location: 'Hyderabad', Branch: 'CSE', Category: 'BC-D', Gender: 'Boys', Region: 'OU', LastRank: 8500, ROI: 82, Placements: 88, Faculty: 80, CampusLife: 80, Seats: 60 },
  { Name: 'CVR College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 5500, ROI: 85, Placements: 89, Faculty: 82, CampusLife: 75, Seats: 240 },
  { Name: 'Narayanamma Institute (Women)', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Girls', Region: 'OU', LastRank: 6000, ROI: 88, Placements: 91, Faculty: 85, CampusLife: 80, Seats: 180 },
  { Name: 'Narayanamma Institute (Women)', Location: 'Hyderabad', Branch: 'CSE', Category: 'BC-E', Gender: 'Girls', Region: 'OU', LastRank: 12500, ROI: 88, Placements: 91, Faculty: 85, CampusLife: 80, Seats: 30 },
  { Name: 'Mahatma Gandhi Institute (MGIT)', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 7500, ROI: 80, Placements: 85, Faculty: 78, CampusLife: 82, Seats: 180 },
  { Name: 'Vardhaman College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 8500, ROI: 81, Placements: 84, Faculty: 79, CampusLife: 80, Seats: 240 },
  { Name: 'Vardhaman College of Engineering', Location: 'Hyderabad', Branch: 'CSE', Category: 'SC', Gender: 'Boys', Region: 'OU', LastRank: 32000, ROI: 81, Placements: 84, Faculty: 79, CampusLife: 80, Seats: 40 },

  // Mid Tier ECE & IT
  { Name: 'Gokaraju Rangaraju', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 8000, ROI: 80, Placements: 82, Faculty: 80, CampusLife: 80, Seats: 180 },
  { Name: 'CVR College of Engineering', Location: 'Hyderabad', Branch: 'IT', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 7200, ROI: 83, Placements: 86, Faculty: 80, CampusLife: 75, Seats: 120 },
  { Name: 'MGIT', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 12000, ROI: 78, Placements: 80, Faculty: 78, CampusLife: 82, Seats: 120 },
  { Name: 'Anurag University', Location: 'Hyderabad', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 11000, ROI: 75, Placements: 82, Faculty: 75, CampusLife: 85, Seats: 300 },
  { Name: 'Anurag University', Location: 'Hyderabad', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'OU', LastRank: 18000, ROI: 72, Placements: 78, Faculty: 75, CampusLife: 85, Seats: 180 },
  
  // AU Region (Andhra)
  { Name: 'Andhra University College of Engineering', Location: 'Visakhapatnam', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 850, ROI: 95, Placements: 94, Faculty: 96, CampusLife: 92, Seats: 60 },
  { Name: 'Andhra University College of Engineering', Location: 'Visakhapatnam', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 1500, ROI: 94, Placements: 92, Faculty: 96, CampusLife: 92, Seats: 60 },
  { Name: 'JNTUK College of Engineering', Location: 'Kakinada', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 1100, ROI: 96, Placements: 93, Faculty: 94, CampusLife: 88, Seats: 60 },
  { Name: 'JNTUK College of Engineering', Location: 'Kakinada', Branch: 'CSE', Category: 'BC-B', Gender: 'Boys', Region: 'AU', LastRank: 2800, ROI: 96, Placements: 93, Faculty: 94, CampusLife: 88, Seats: 20 },
  { Name: 'Gayatri Vidya Parishad (GVP)', Location: 'Visakhapatnam', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 2500, ROI: 88, Placements: 90, Faculty: 85, CampusLife: 82, Seats: 240 },
  { Name: 'Gayatri Vidya Parishad (GVP)', Location: 'Visakhapatnam', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 4800, ROI: 85, Placements: 86, Faculty: 85, CampusLife: 82, Seats: 180 },
  { Name: 'VR Siddhartha', Location: 'Vijayawada', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 3200, ROI: 85, Placements: 88, Faculty: 84, CampusLife: 80, Seats: 180 },
  { Name: 'VR Siddhartha', Location: 'Vijayawada', Branch: 'CSE', Category: 'SC', Gender: 'Boys', Region: 'AU', LastRank: 18000, ROI: 85, Placements: 88, Faculty: 84, CampusLife: 80, Seats: 30 },
  { Name: 'RVR & JC College', Location: 'Guntur', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'AU', LastRank: 6500, ROI: 82, Placements: 85, Faculty: 80, CampusLife: 82, Seats: 240 },
  
  // SVU Region (Tirupati/Rayalaseema)
  { Name: 'SVU College of Engineering', Location: 'Tirupati', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 1600, ROI: 93, Placements: 90, Faculty: 92, CampusLife: 88, Seats: 60 },
  { Name: 'SVU College of Engineering', Location: 'Tirupati', Branch: 'CSE', Category: 'BC-A', Gender: 'Girls', Region: 'SVU', LastRank: 4200, ROI: 93, Placements: 90, Faculty: 92, CampusLife: 88, Seats: 15 },
  { Name: 'JNTUA College of Engineering', Location: 'Anantapur', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 2200, ROI: 92, Placements: 88, Faculty: 90, CampusLife: 85, Seats: 60 },
  { Name: 'JNTUA College of Engineering', Location: 'Anantapur', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 3800, ROI: 90, Placements: 85, Faculty: 90, CampusLife: 85, Seats: 60 },
  { Name: 'Sree Vidyanikethan', Location: 'Tirupati', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 5500, ROI: 85, Placements: 85, Faculty: 82, CampusLife: 90, Seats: 300 },
  { Name: 'Sree Vidyanikethan', Location: 'Tirupati', Branch: 'CSE', Category: 'SC', Gender: 'Boys', Region: 'SVU', LastRank: 28000, ROI: 85, Placements: 85, Faculty: 82, CampusLife: 90, Seats: 50 },
  { Name: 'G Pulla Reddy', Location: 'Kurnool', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 7000, ROI: 82, Placements: 82, Faculty: 80, CampusLife: 80, Seats: 180 },
  { Name: 'Madanapalle Institute', Location: 'Madanapalle', Branch: 'CSE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 9500, ROI: 80, Placements: 80, Faculty: 78, CampusLife: 85, Seats: 240 },
  { Name: 'Madanapalle Institute', Location: 'Madanapalle', Branch: 'ECE', Category: 'OC', Gender: 'Boys', Region: 'SVU', LastRank: 16000, ROI: 78, Placements: 75, Faculty: 78, CampusLife: 85, Seats: 180 },
];

function seed() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS colleges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Location TEXT,
      Branch TEXT,
      Category TEXT,
      Gender TEXT,
      Region TEXT,
      LastRank INTEGER,
      ROI INTEGER,
      Placements INTEGER,
      Faculty INTEGER,
      CampusLife INTEGER,
      Seats INTEGER
    )
  `);

  // Clear existing
  db.exec('DELETE FROM colleges');

  const insert = db.prepare(`
    INSERT INTO colleges (Name, Location, Branch, Category, Gender, Region, LastRank, ROI, Placements, Faculty, CampusLife, Seats)
    VALUES (@Name, @Location, @Branch, @Category, @Gender, @Region, @LastRank, @ROI, @Placements, @Faculty, @CampusLife, @Seats)
  `);

  const insertMany = db.transaction((colleges) => {
    for (const college of colleges) {
      insert.run(college);
    }
  });

  insertMany(seedData);
  console.log(`Successfully seeded ${seedData.length} records into the database.`);
}

seed();
