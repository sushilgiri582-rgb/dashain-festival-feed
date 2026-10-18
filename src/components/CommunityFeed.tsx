import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Video, Film } from 'lucide-react';
import { Post } from '../types';
import { StoryCard } from './StoryCard';
import { COUNTRIES_LIST } from '../data/seedData';
import { Translations, Language } from '../i18n/translations';

interface CommunityFeedProps {
  posts: Post[];
  likedPostIds: Set<string>;
  onToggleLike: (postId: string) => void;
  onOpenDetail: (post: Post) => void;
  onOpenSubmit: () => void;
  onTriggerConfetti: () => void;
  t: Translations;
  language: Language;
}

type FilterTab = 'all' | 'video' | 'dashain' | 'tihar' | 'bhai_tika' | 'deusi' | 'diaspora';

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  likedPostIds,
  onToggleLike,
  onOpenDetail,
  onOpenSubmit,
  onTriggerConfetti,
  t,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'comments'>('newest');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Must be approved by moderator/system
      if (!post.isApproved) return false;

      // Filter Tab
      if (activeTab === 'video') {
        if (post.mediaType !== 'video') return false;
      } else if (activeTab === 'dashain') {
        if (post.category !== 'dashain_tika' && post.category !== 'jamara_ghatasthapana') return false;
      } else if (activeTab === 'tihar') {
        if (post.category !== 'tihar_lights') return false;
      } else if (activeTab === 'bhai_tika') {
        if (post.category !== 'bhai_tika') return false;
      } else if (activeTab === 'deusi') {
        if (post.category !== 'deusi_bhailo') return false;
      } else if (activeTab === 'diaspora') {
        if (post.country === 'Nepal') return false;
      }

      // Country Filter
      if (selectedCountry !== 'ALL' && post.country !== selectedCountry) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          post.title.toLowerCase().includes(query) ||
          post.story.toLowerCase().includes(query) ||
          post.userName.toLowerCase().includes(query) ||
          post.familyName.toLowerCase().includes(query) ||
          post.city.toLowerCase().includes(query) ||
          post.country.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'likes') return b.likesCount - a.likesCount;
      if (sortBy === 'comments') return b.comments.length - a.comments.length;
      // Default: featured first, then original order
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [posts, activeTab, selectedCountry, searchQuery, sortBy]);

  const videoPostsCount = posts.filter((p) => p.isApproved && p.mediaType === 'video').length;

  return (
    <section id="feed-section" className="py-12 border-t border-amber-900/10 dark:border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              {t.feedSectionKicker}
            </div>
            <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
              {t.feedSectionTitle}
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {t.feedSectionSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-amber-700 transition-colors shrink-0 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t.feedAddStoryBtn}</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabAll} ({posts.length})
            </button>

            {/* Prominent Video Celebrations Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-red-600 text-white shadow-xs font-bold ring-2 ring-red-400/50'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50'
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>{t.feedTabVideo}</span>
              <span className="rounded-full bg-red-600/20 dark:bg-red-900/60 px-1.5 py-0.2 text-[10px] font-bold">
                {videoPostsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashain')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'dashain'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabDashain}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tihar')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'tihar'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabTihar}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bhai_tika')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'bhai_tika'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabBhaiTika}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('deusi')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'deusi'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabDeusi}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('diaspora')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'diaspora'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              {t.feedTabDiaspora}
            </button>
          </div>

          {/* Search, Country Filter & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder={t.feedSearchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  {t.feedClearSearch}
                </button>
              )}
            </div>

            {/* Country Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full sm:w-44 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:border-amber-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
              >
                <option value="ALL">{t.feedAllCountries}</option>
                {COUNTRIES_LIST.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'likes' | 'comments')}
                className="w-full sm:w-40 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:border-amber-500 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
              >
                <option value="newest">{t.feedSortLatest}</option>
                <option value="likes">{t.feedSortLoved}</option>
                <option value="comments">{t.feedSortBlessings}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Video Feed Spotlight Banner */}
        {activeTab === 'video' && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-red-300/80 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-orange-500/10 p-5 sm:p-6 shadow-sm dark:border-red-900/60 dark:bg-stone-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 text-white shadow-md">
                  <Video className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Playfair_Display',Georgia,serif] text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                      {t.videoReelTitle}
                    </h3>
                    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      LIVE
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    {t.videoReelSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/80 dark:bg-stone-800/80 px-3.5 py-2 text-xs font-bold text-amber-950 dark:text-amber-200 border border-amber-300/60 dark:border-stone-700 shadow-2xs shrink-0">
                <span className="text-base">🎵</span>
                <span>{t.videoPlayingTheme}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post) => (
              <StoryCard
                key={post.id}
                post={post}
                isLiked={likedPostIds.has(post.id)}
                onToggleLike={onToggleLike}
                onOpenDetail={onOpenDetail}
                onTriggerConfetti={onTriggerConfetti}
                t={t}
                language={language}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
            <span className="text-4xl block mb-2">🪔</span>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-stone-900 dark:text-stone-100">
              {t.feedEmptyTitle}
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              {t.feedEmptyDesc}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                  setSelectedCountry('ALL');
                }}
                className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
              >
                {t.feedResetFilters}
              </button>
              <button
                type="button"
                onClick={onOpenSubmit}
                className="rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
              >
                {t.feedShareFirst}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
