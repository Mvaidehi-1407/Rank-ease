import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PredictorHub from './pages/PredictorHub';
import Profile from './pages/profile';
import Settings from './pages/settings';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-textMain flex flex-col">
        <Navbar />
        <main className="flex-1 w-full pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predictor" element={<PredictorHub />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;
