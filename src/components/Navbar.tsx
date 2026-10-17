import React from 'react';
import { Moon, Sun, Volume2, VolumeX, ShieldCheck, Sparkles, PlusCircle } from 'lucide-react';
import { festiveAudio } from '../utils/festiveAudio';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  petalsEnabled: boolean;
  setPetalsEnabled: (val: boolean) => void;
  audioPlaying: boolean;
  setAudioPlaying: (val: boolean) => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
  onTriggerConfetti: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  petalsEnabled,
  setPetalsEnabled,
  audioPlaying,
  setAudioPlaying,
  onOpenSubmit,
  onOpenAdmin,
  onTriggerConfetti,
  isAdminLoggedIn,
}) => {
  const toggleAudio = () => {
    const isNowPlaying = festiveAudio.toggle();
    setAudioPlaying(isNowPlaying);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-amber-900/10 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-amber-950 dark:text-amber-100 sm:text-xl whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-600 to-red-600 text-base text-white shadow-sm">
            🪔
          </span>
          <span className="font-['Playfair_Display',Georgia,serif] text-xl font-bold tracking-normal text-stone-900 dark:text-stone-50">
            Mero Dashain & Tihar
          </span>
        </a>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <a
            href="#feed-section"
            className="whitespace-nowrap transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Community Feed
          </a>
          <a
            href="#traditions-section"
            className="whitespace-nowrap transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Festival Calendar
          </a>
          <a
            href="#creator-section"
            className="whitespace-nowrap transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Creator Profile
          </a>
          <button
            type="button"
            onClick={onTriggerConfetti}
            className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            title="Shower Sayapatri petals"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Blessings Shower</span>
          </button>
        </nav>

        {/* Zone 3: Interactive controls & 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Ambient Festival Audio Synthesizer */}
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              audioPlaying
                ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                : 'border-stone-200 bg-transparent text-stone-500 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:text-stone-100'
            }`}
            title={audioPlaying ? 'Mute ambient chimes' : 'Play peaceful festive chimes'}
            aria-label="Toggle ambient chimes"
          >
            {audioPlaying ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Falling Petals Toggle */}
          <button
            type="button"
            onClick={() => setPetalsEnabled(!petalsEnabled)}
            className={`hidden sm:flex h-9 items-center gap-1.5 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
              petalsEnabled
                ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                : 'border-stone-200 text-stone-500 hover:text-stone-800 dark:border-stone-800 dark:text-stone-400'
            }`}
            title="Toggle floating marigold petals"
          >
            <span>🌸</span>
            <span>{petalsEnabled ? 'Petals On' : 'Petals Off'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-900"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-stone-700" />}
          </button>

          {/* Admin Dashboard Lock Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              isAdminLoggedIn
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'border-stone-200 text-stone-500 hover:text-amber-700 dark:border-stone-800 dark:text-stone-400 dark:hover:text-amber-400'
            }`}
            title="Creator & Admin Dashboard (Sushil Giri)"
            aria-label="Open Admin Dashboard"
          >
            <ShieldCheck className="h-4 w-4" />
          </button>

          {/* Primary CTA: Share Your Story */}
          <button
            type="button"
            onClick={onOpenSubmit}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:from-red-700 hover:to-amber-700 hover:shadow active:scale-95 whitespace-nowrap shrink-0 sm:text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Share Story</span>
          </button>
        </div>

      </div>
    </header>
  );
};
