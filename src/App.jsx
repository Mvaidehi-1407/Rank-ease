import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import PredictorHub from './pages/PredictorHub';
import Profile from './pages/profile';
import Settings from './pages/settings';
import SavedColleges from './pages/SavedColleges';
import PrivacyPolicy from './pages/PrivacyPolicy';

import LoginPage from './pages/LoginPage';
import LogoSplash from './pages/LogoSplash';

import AIAssistant from './components/AIAssistant';

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/logo' ||
    location.pathname === '/login';

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col overflow-hidden">

      {!hideNavbar && <Navbar />}

      <main className={`flex-1 w-full ${!hideNavbar ? 'pt-20' : ''}`}>

        <Routes>

          {/* 🔥 DEFAULT REDIRECT (IMPORTANT FIX) */}
          <Route path="/" element={<Navigate to="/logo" replace />} />

          {/* SPLASH */}
          <Route path="/logo" element={<LogoSplash />} />

          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />

          {/* MAIN APP */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/predictor" element={<PredictorHub />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/saved-colleges" element={<SavedColleges />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

        </Routes>

      </main>

      {!hideNavbar && <AIAssistant />}

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout />
      </Router>
    </ErrorBoundary>
  );
}
