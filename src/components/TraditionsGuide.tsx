import React, { useState } from 'react';
import { FESTIVAL_CALENDAR_INFO, FESTIVAL_CALENDAR_INFO_NEPALI } from '../data/seedData';
import { Translations, Language } from '../i18n/translations';

interface TraditionsGuideProps {
  t: Translations;
  language: Language;
}

export const TraditionsGuide: React.FC<TraditionsGuideProps> = ({ t, language }) => {
  const [selectedFestival, setSelectedFestival] = useState<'dashain' | 'tihar'>('dashain');

  const calendarData = language === 'ne' ? FESTIVAL_CALENDAR_INFO_NEPALI : FESTIVAL_CALENDAR_INFO;
  const currentInfo = selectedFestival === 'dashain' ? calendarData[0] : calendarData[1];

  return (
    <section id="traditions-section" className="py-14 bg-amber-50/30 dark:bg-stone-900/40 border-t border-amber-900/10 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
            {t.traditionsKicker}
          </div>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
            {t.traditionsTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {t.traditionsDesc}
          </p>

          {/* Toggle between Dashain & Tihar */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-stone-200/70 dark:bg-stone-800/80">
            <button
              type="button"
              onClick={() => setSelectedFestival('dashain')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFestival === 'dashain'
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-stone-50'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              {t.traditionsDashainTab}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFestival('tihar')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFestival === 'tihar'
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-stone-50'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
              }`}
            >
              {t.traditionsTiharTab}
            </button>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentInfo.days.map((day, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs transition-all hover:border-amber-400 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-medium mb-2">
                <span>{t.traditionsPhase} {idx + 1}</span>
                <span className="font-mono">{t.traditionsRitual}</span>
              </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
                {day.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {day.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Cultural Highlights Footer */}
        <div className="mt-8 rounded-2xl border border-amber-300/60 bg-gradient-to-r from-amber-100/40 via-red-50/30 to-amber-100/40 p-5 dark:border-stone-800 dark:from-stone-900 dark:via-amber-950/20 dark:to-stone-900">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {t.traditionsJamaraTitle}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  {t.traditionsJamaraDesc}
                </p>
              </div>
            </div>
            <a
              href="#feed-section"
              className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline shrink-0"
            >
              {t.traditionsJamaraLink}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
