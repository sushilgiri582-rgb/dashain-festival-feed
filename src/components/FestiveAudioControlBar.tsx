import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Play, Pause, Music, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { festiveAudio, FestiveTrackType } from '../utils/festiveAudio';
import { Translations, Language } from '../i18n/translations';

interface FestiveAudioControlBarProps {
  t: Translations;
  language: Language;
  defaultTrack?: FestiveTrackType;
  autoPlay?: boolean;
}

export const FestiveAudioControlBar: React.FC<FestiveAudioControlBarProps> = ({
  t,
  language,
  defaultTrack = 'malshree',
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(festiveAudio.isPlayingTrack());
  const [isMuted, setIsMuted] = useState(festiveAudio.isMuted());
  const [volume, setVolume] = useState(festiveAudio.getVolume());
  const [currentTrack, setCurrentTrack] = useState<FestiveTrackType>(festiveAudio.getCurrentTrack() || defaultTrack);

  // Sync state on audio engine changes
  useEffect(() => {
    const unsubscribe = festiveAudio.subscribe(() => {
      setIsPlaying(festiveAudio.isPlayingTrack());
      setIsMuted(festiveAudio.isMuted());
      setVolume(festiveAudio.getVolume());
      setCurrentTrack(festiveAudio.getCurrentTrack());
    });

    if (autoPlay && !festiveAudio.isPlayingTrack()) {
      festiveAudio.playTrack(defaultTrack);
    }

    return () => {
      unsubscribe();
    };
  }, [autoPlay, defaultTrack]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      festiveAudio.stop();
    } else {
      festiveAudio.playTrack(currentTrack);
    }
  };

  const handleSelectTrack = (track: FestiveTrackType) => {
    setCurrentTrack(track);
    festiveAudio.playTrack(track);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    festiveAudio.setVolume(val);
    if (isMuted && val > 0) {
      festiveAudio.setMuted(false);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = festiveAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const volumePercent = Math.round((isMuted ? 0 : volume) * 100);

  return (
    <div className="w-full rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 p-4 sm:p-5 backdrop-blur-md shadow-md dark:border-amber-700/60 dark:bg-stone-900/90">
      
      {/* Top Row: Track Identification & Live Audio Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/60 pb-3.5 dark:border-stone-800">
        
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-red-600 text-white shadow-sm">
            <Music className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {t.videoPlayingTheme}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Sparkles className="h-2.5 w-2.5" />
                <span>100% Royalty-Free</span>
              </span>
            </div>
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {currentTrack === 'malshree' ? t.audioMalshreeTrack : currentTrack === 'deusi' ? t.audioDeusiTrack : t.audioTempleTrack}
            </p>
          </div>
        </div>

        {/* Animated Equalizer Visualizer Bars */}
        <div className="flex items-center gap-1.5 h-6 px-3 rounded-lg bg-amber-100/70 dark:bg-stone-800/80">
          <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 mr-1 hidden sm:inline">
            {isPlaying && !isMuted ? (language === 'ne' ? 'धुन बज्दै...' : 'Now Playing') : (language === 'ne' ? 'धुन रोकियो' : 'Paused')}
          </span>
          <div className="flex items-end gap-1 h-4">
            <span
              className={`w-1 rounded-full bg-amber-600 transition-all duration-150 ${
                isPlaying && !isMuted ? 'h-4 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-red-600 transition-all duration-200 ${
                isPlaying && !isMuted ? 'h-3 animate-bounce' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-amber-500 transition-all duration-150 ${
                isPlaying && !isMuted ? 'h-5 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-orange-600 transition-all duration-300 ${
                isPlaying && !isMuted ? 'h-3.5 animate-bounce' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-1 rounded-full bg-amber-600 transition-all duration-150 ${
                isPlaying && !isMuted ? 'h-2 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
          </div>
        </div>

      </div>

      {/* Middle Row: Track Switcher & Primary Controls */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Track Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-amber-100/80 dark:bg-stone-800/90 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleSelectTrack('malshree')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              currentTrack === 'malshree'
                ? 'bg-white text-stone-900 shadow-xs font-bold dark:bg-stone-900 dark:text-stone-100'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
            }`}
          >
            <span>🌾</span>
            <span>{language === 'ne' ? 'मालश्री धुन (दसैँ)' : 'Malshree (Dashain)'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTrack('deusi')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              currentTrack === 'deusi'
                ? 'bg-white text-stone-900 shadow-xs font-bold dark:bg-stone-900 dark:text-stone-100'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
            }`}
          >
            <span>🪔</span>
            <span>{language === 'ne' ? 'देउसी-भैलो (तिहार)' : 'Deusi-Bhailo (Tihar)'}</span>
          </button>
        </div>

        {/* Volume & Playback Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
          
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Pause Background Audio' : 'Play Background Audio'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>{language === 'ne' ? 'रोक्नुहोस्' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>{language === 'ne' ? 'बजाउनुहोस्' : 'Play Track'}</span>
              </>
            )}
          </button>

          {/* Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isMuted
                ? 'border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300'
                : 'border-stone-200 bg-white text-stone-700 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Toggle Mute"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : volume < 0.5 ? (
              <Volume1 className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
          </button>

          {/* Volume Slider with Numeric Percentage Display */}
          <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[150px]">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 dark:bg-stone-700 accent-amber-600"
              aria-label={t.audioVolumeLabel}
            />
            <span className="w-9 text-right font-mono text-xs font-bold text-stone-700 dark:text-stone-300">
              {volumePercent}%
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Guarantee Banner */}
      <div className="mt-3 flex items-center justify-between border-t border-amber-200/40 pt-2 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          <span>{t.audioRoyaltyFreeBadge}</span>
        </span>
        <span className="font-medium text-amber-800/80 dark:text-amber-300/80 hidden md:inline">
          {t.audioLoudClarityNote}
        </span>
      </div>

    </div>
  );
};
