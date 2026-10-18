import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Check } from 'lucide-react';
import { Post } from '../types';
import { Translations, Language, CATEGORY_NAMES_NEPALI } from '../i18n/translations';

interface StoryCardProps {
  post: Post;
  isLiked: boolean;
  onToggleLike: (postId: string) => void;
  onOpenDetail: (post: Post) => void;
  onTriggerConfetti: () => void;
  t: Translations;
  language: Language;
}

const CATEGORY_NAMES_ENGLISH: Record<string, string> = {
  dashain_tika: 'Vijaya Dashami Tika',
  tihar_lights: 'Tihar & Laxmi Puja',
  bhai_tika: 'Sacred Bhai Tika',
  deusi_bhailo: 'Deusi Bhailo Tradition',
  jamara_ghatasthapana: 'Ghatasthapana & Jamara',
  diaspora_gathering: 'Global Diaspora Gathering',
};

export const StoryCard: React.FC<StoryCardProps> = ({
  post,
  isLiked,
  onToggleLike,
  onOpenDetail,
  onTriggerConfetti,
  t,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.href.split('#')[0] + `#story-${post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike(post.id);
    if (!isLiked) {
      onTriggerConfetti();
    }
  };

  const categoryLabel =
    language === 'ne'
      ? CATEGORY_NAMES_NEPALI[post.category] || post.category
      : CATEGORY_NAMES_ENGLISH[post.category] || post.category;

  return (
    <article
      onClick={() => onOpenDetail(post)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 cursor-pointer"
      id={`story-${post.id}`}
    >
      <div>
        {/* Media Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
          <img
            src={post.mediaUrl}
            alt={post.mediaAlt || post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%2378350f"/><text x="200" y="130" font-family="sans-serif" font-size="20" fill="%23fef08a" text-anchor="middle">🪔 Festive Celebration</text></svg>';
            }}
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Location indicator in top-left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            <span>{post.countryCode}</span>
            <span>{post.city}</span>
          </div>

          {/* Festival type on bottom-left */}
          <div className="absolute bottom-3 left-3 text-xs font-semibold text-amber-200 drop-shadow-sm">
            {categoryLabel}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          
          {/* Metadata: Clean unboxed text with dot separators */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {post.userName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.familyName}</span>
            <span aria-hidden="true">·</span>
            <span>{post.timestamp}</span>
          </div>

          {/* Title */}
          <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-stone-900 group-hover:text-amber-600 dark:text-stone-100 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
            {post.story}
          </p>

          {/* Blessings highlight */}
          {post.blessings && (
            <div className="mt-3.5 rounded-lg border border-amber-200/60 bg-amber-50/60 p-2.5 text-xs italic text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200 line-clamp-2">
              "{post.blessings}"
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="border-t border-stone-100 px-5 py-3.5 dark:border-stone-800/80 flex items-center justify-between">
        
        {/* Like Button */}
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
            isLiked
              ? 'text-red-600 font-bold dark:text-red-400'
              : 'text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400'
          }`}
          title={isLiked ? t.cardUnlike : t.cardSendHeart}
        >
          <Heart
            className={`h-4 w-4 transition-transform ${
              isLiked ? 'fill-red-600 text-red-600 scale-110' : ''
            }`}
          />
          <span className="font-mono tabular-nums">{post.likesCount}</span>
        </button>

        {/* Comments / Blessings Counter */}
        <button
          type="button"
          onClick={() => onOpenDetail(post)}
          className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="font-mono tabular-nums">{post.comments.length}</span>
          <span className="hidden sm:inline">{t.cardBlessings}</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200 transition-colors"
          title={t.cardShare}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">{t.cardCopied}</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>{t.cardShare}</span>
            </>
          )}
        </button>

      </div>
    </article>
  );
};
