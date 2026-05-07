import { useState } from 'react';
import {
  Bell,
  Shield,
  Lock,
  Save,
  User,
  LayoutDashboard,
  SlidersHorizontal,
  Database,
  Eye,
  Smartphone,
  CheckCircle2,
  Globe,
  Sparkles,
  MonitorCog,
  Cpu,
  BadgeCheck
} from 'lucide-react';

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
        enabled ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-white/20'
      }`}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
          enabled ? 'translate-x-7' : ''
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    notifications: true,
    aiInsights: true,
    profileVisibility: true,
    recommendationAlerts: true,
    autoSavePredictions: true,
    analyticsTracking: false,
    compactMode: false,
    uiStyle: 'Ultra Smooth',
    deviceSync: true,
    privacy: 'Public',
    realtimeUpdates: true,
    smartRanking: true,
    performanceMode: false
  });

  const handleSave = () => {
    localStorage.setItem(
      'rankwise-settings',
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-primary to-secondary flex items-center justify-center shadow-xl">
                <MonitorCog className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-black tracking-tight">
                  Settings
                </h1>

                <p className="text-textMuted mt-1">
                  Personalize your RankWise AI experience
                </p>
              </div>
            </div>
          </div>

          {saved && (
            <div className="mt-6 lg:mt-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 animate-pulse">
              <CheckCircle2 className="w-5 h-5" />
              Settings Saved Successfully
            </div>
          )}
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Account Preferences
              </h2>

              <p className="text-textMuted text-sm">
                Manage account activity and notifications
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* NOTIFICATIONS */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center hover:border-primary/20 transition-all">
              <div>
                <h3 className="font-semibold text-lg">
                  Notifications
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Receive admission alerts and updates
                </p>
              </div>

              <Toggle
                enabled={settings.notifications}
                onChange={() =>
                  setSettings({
                    ...settings,
                    notifications: !settings.notifications
                  })
                }
              />
            </div>

            {/* AI INSIGHTS */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center hover:border-primary/20 transition-all">
              <div>
                <h3 className="font-semibold text-lg">
                  AI Smart Suggestions
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Enable intelligent college predictions
                </p>
              </div>

              <Toggle
                enabled={settings.aiInsights}
                onChange={() =>
                  setSettings({
                    ...settings,
                    aiInsights: !settings.aiInsights
                  })
                }
              />
            </div>

            {/* PUBLIC PROFILE */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center hover:border-primary/20 transition-all">
              <div>
                <h3 className="font-semibold text-lg">
                  Public Profile
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Allow profile visibility to other users
                </p>
              </div>

              <Toggle
                enabled={settings.profileVisibility}
                onChange={() =>
                  setSettings({
                    ...settings,
                    profileVisibility: !settings.profileVisibility
                  })
                }
              />
            </div>

            {/* AUTO SAVE */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center hover:border-primary/20 transition-all">
              <div>
                <h3 className="font-semibold text-lg">
                  Auto Save Predictions
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Save your simulations automatically
                </p>
              </div>

              <Toggle
                enabled={settings.autoSavePredictions}
                onChange={() =>
                  setSettings({
                    ...settings,
                    autoSavePredictions:
                      !settings.autoSavePredictions
                  })
                }
              />
            </div>

          </div>
        </div>

        {/* UI EXPERIENCE */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                UI Experience
              </h2>

              <p className="text-textMuted text-sm">
                Customize interface and animations
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* UI STYLE */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">

              <label className="text-sm text-textMuted block mb-3">
                Animation Level
              </label>

              <select
                value={settings.uiStyle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    uiStyle: e.target.value
                  })
                }
                className="w-full bg-white/10 text-white border border-white/10 rounded-xl p-4 outline-none"
              >
                <option className="text-black">
                  Ultra Smooth
                </option>

                <option className="text-black">
                  Balanced
                </option>

                <option className="text-black">
                  Minimal Motion
                </option>
              </select>
            </div>

            {/* PRIVACY */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">

              <label className="text-sm text-textMuted block mb-3">
                Privacy Mode
              </label>

              <select
                value={settings.privacy}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: e.target.value
                  })
                }
                className="w-full bg-white/10 text-white border border-white/10 rounded-xl p-4 outline-none"
              >
                <option className="text-black">
                  Public
                </option>

                <option className="text-black">
                  Private
                </option>

                <option className="text-black">
                  Friends Only
                </option>
              </select>
            </div>

            {/* COMPACT MODE */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">

              <div className="flex gap-3">
                <SlidersHorizontal className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold text-lg">
                    Compact Layout
                  </h3>

                  <p className="text-sm text-textMuted mt-1">
                    Reduce padding and spacing
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.compactMode}
                onChange={() =>
                  setSettings({
                    ...settings,
                    compactMode: !settings.compactMode
                  })
                }
              />
            </div>

            {/* DEVICE SYNC */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">

              <div className="flex gap-3">
                <Smartphone className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold text-lg">
                    Device Sync
                  </h3>

                  <p className="text-sm text-textMuted mt-1">
                    Sync settings across devices
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.deviceSync}
                onChange={() =>
                  setSettings({
                    ...settings,
                    deviceSync: !settings.deviceSync
                  })
                }
              />
            </div>

          </div>
        </div>

        {/* ADVANCED AI */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Advanced AI Features
              </h2>

              <p className="text-textMuted text-sm">
                Intelligent automation and performance
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* REALTIME */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  Real-time Updates
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Live prediction refresh
                </p>
              </div>

              <Toggle
                enabled={settings.realtimeUpdates}
                onChange={() =>
                  setSettings({
                    ...settings,
                    realtimeUpdates:
                      !settings.realtimeUpdates
                  })
                }
              />
            </div>

            {/* SMART RANKING */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  Smart Ranking
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  AI optimized sorting system
                </p>
              </div>

              <Toggle
                enabled={settings.smartRanking}
                onChange={() =>
                  setSettings({
                    ...settings,
                    smartRanking:
                      !settings.smartRanking
                  })
                }
              />
            </div>

            {/* PERFORMANCE */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">
              <div className="flex gap-3">
                <Cpu className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold text-lg">
                    Performance Mode
                  </h3>

                  <p className="text-sm text-textMuted mt-1">
                    Faster loading with reduced effects
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.performanceMode}
                onChange={() =>
                  setSettings({
                    ...settings,
                    performanceMode:
                      !settings.performanceMode
                  })
                }
              />
            </div>

            {/* VERIFIED */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary mt-1" />

              <div>
                <h3 className="font-semibold text-lg">
                  Verified Predictions
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  AI validates prediction accuracy
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECURITY */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Security & Privacy
              </h2>

              <p className="text-textMuted text-sm">
                Protect your account and activity
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">
              <div className="flex gap-3">
                <Database className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold text-lg">
                    Analytics Tracking
                  </h3>

                  <p className="text-sm text-textMuted mt-1">
                    Improve AI recommendation quality
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.analyticsTracking}
                onChange={() =>
                  setSettings({
                    ...settings,
                    analyticsTracking:
                      !settings.analyticsTracking
                  })
                }
              />
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex justify-between items-center">
              <div className="flex gap-3">
                <Bell className="w-5 h-5 text-primary mt-1" />

                <div>
                  <h3 className="font-semibold text-lg">
                    Recommendation Alerts
                  </h3>

                  <p className="text-sm text-textMuted mt-1">
                    Get notified instantly
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.recommendationAlerts}
                onChange={() =>
                  setSettings({
                    ...settings,
                    recommendationAlerts:
                      !settings.recommendationAlerts
                  })
                }
              />
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-start gap-3">
              <Lock className="w-5 h-5 text-primary mt-1" />

              <div>
                <h3 className="font-semibold text-lg">
                  Account Security
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Secure login and authentication
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-start gap-3">
              <Eye className="w-5 h-5 text-primary mt-1" />

              <div>
                <h3 className="font-semibold text-lg">
                  Activity Visibility
                </h3>

                <p className="text-sm text-textMuted mt-1">
                  Control your public activity
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-linear-to-r from-primary to-secondary font-bold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}