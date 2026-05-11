import { ShieldCheck, Lock, Database, Eye, Trash2 } from 'lucide-react';

export default function PrivacyPolicy() {

  return (
    <div className="min-h-screen px-6 py-10 text-white">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-primary" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        {/* INTRO */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-6">
          <p className="text-textMuted leading-relaxed">
            RankWise AI respects your privacy. This page explains how your data is handled,
            stored, and protected while using our college prediction system.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* DATA STORAGE */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Database className="text-primary" />
              <h2 className="font-bold">Data Storage</h2>
            </div>
            <p className="text-textMuted text-sm">
              We store only essential user preferences and simulation history. No sensitive
              personal data is collected without consent.
            </p>
          </div>

          {/* SECURITY */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-primary" />
              <h2 className="font-bold">Security</h2>
            </div>
            <p className="text-textMuted text-sm">
              All data is encrypted and protected using industry-standard security protocols.
            </p>
          </div>

          {/* USAGE */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="text-primary" />
              <h2 className="font-bold">Usage Tracking</h2>
            </div>
            <p className="text-textMuted text-sm">
              We track only feature usage to improve AI recommendations and prediction accuracy.
            </p>
          </div>

          {/* DELETE DATA */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="text-primary" />
              <h2 className="font-bold">Data Control</h2>
            </div>
            <p className="text-textMuted text-sm">
              You can request deletion of all your saved data anytime from settings.
            </p>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-8 text-center text-xs text-textMuted">
          Last updated: 2026 • RankWise AI
        </div>

      </div>

    </div>
  );
}