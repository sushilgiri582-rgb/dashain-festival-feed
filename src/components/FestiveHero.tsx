import React from 'react';
import { Sparkles, Heart, Globe2, Share2, Flame, MapPin } from 'lucide-react';
import { FESTIVE_ARTWORKS } from '../utils/festiveArtworks';
import { AdminAnnouncement } from '../types';

interface FestiveHeroProps {
  totalPosts: number;
  uniqueCountries: number;
  totalLikes: number;
  announcement: AdminAnnouncement | null;
  onOpenSubmit: () => void;
  onTriggerConfetti: () => void;
}

export const FestiveHero: React.FC<FestiveHeroProps> = ({
  totalPosts,
  uniqueCountries,
  totalLikes,
  announcement,
  onOpenSubmit,
  onTriggerConfetti,
}) => {
  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20">
      
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-full -translate-x-1/2 max-w-5xl rounded-full bg-gradient-to-b from-amber-400/20 via-red-500/10 to-transparent blur-3xl dark:from-amber-600/15 dark:via-red-950/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Admin Announcement Banner if Active */}
        {announcement && announcement.active && (
          <div className="mb-6 overflow-hidden rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-100/90 via-orange-50 to-red-50 p-4 shadow-sm dark:border-amber-800/80 dark:from-amber-950/60 dark:via-stone-900 dark:to-red-950/40">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                🪔
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                    {announcement.title}
                  </h4>
                  <span className="text-xs text-amber-800/70 dark:text-amber-400">· Official Notice</span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  {announcement.content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7">
            
            {/* Kicker / Subtitle */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              <span>Bada Dashain & Tihar (Deepawali) Celebration</span>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <span>Nepal & Global Diaspora</span>
            </div>

            <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-stone-50 leading-[1.18] text-balance">
              Where Nepali Hearts Unite Across the Globe
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl">
              From the terraced green hills of Nepal to vibrant diaspora homes worldwide. Share your family's golden Jamara, scarlet Vijaya Dashami Tika, glowing Tihar diyas, and authentic cultural blessings.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-98"
              >
                <Sparkles className="h-4 w-4" />
                <span>Share Your Family Story</span>
              </button>

              <button
                type="button"
                onClick={onTriggerConfetti}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50/70 px-4 py-3 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/70"
              >
                <span>🌸</span>
                <span>Send Sayapatri Shower</span>
              </button>

              <a
                href="#feed-section"
                className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
              >
                <span>Explore Global Wall</span>
                <span>↓</span>
              </a>
            </div>

            {/* Managed by Sushil Giri Attribution Notice */}
            <div className="mt-6 pt-5 border-t border-amber-900/10 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-stone-800 dark:text-stone-200">Platform Managed by Sushil Giri</span>
              <span>·</span>
              <span>WhatsApp: +977 9860228005</span>
              <span>·</span>
              <span>Free Community Initiative</span>
            </div>

          </div>

          {/* Right Column: Immersive Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="overflow-hidden rounded-2xl border-2 border-amber-400/40 bg-stone-900 shadow-2xl transition-all duration-300 dark:border-amber-700/50">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                  <img
                    src={FESTIVE_ARTWORKS.himalayan_village_ping}
                    alt="Traditional Nepali village celebration with Himalayan peaks and bamboo swing"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* On-image caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                    <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="h-3.5 w-3.5" />
                        Nepal Himalayas & Hillside Villages
                      </span>
                      <span className="font-mono text-amber-200">Linge Ping & Sayapatri</span>
                    </div>
                    <p className="font-['Playfair_Display',Georgia,serif] text-base sm:text-lg font-bold leading-tight">
                      "Once a year, touch the sky and renew the spirit."
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Diya Card Overlay */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 rounded-xl border border-amber-300 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-amber-800 dark:bg-stone-900/95 max-w-[210px]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Flame className="h-5 w-5 fill-amber-500 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Tihar Lights
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                      108 sacred oil diyas glowing
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Impact Stats Strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-amber-900/10 bg-amber-50/50 p-4 sm:grid-cols-4 sm:p-6 dark:border-stone-800 dark:bg-stone-900/60">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 font-mono tabular-nums">
              {totalPosts}
            </div>
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              Global Stories Shared
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
              {uniqueCountries}
            </div>
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              Countries Represented
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 font-mono tabular-nums">
              {totalLikes.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              Blessings & Hearts (❤️)
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              Worldwide Community Love
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
