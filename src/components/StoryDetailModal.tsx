import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, MapPin, Send, Check, Video } from 'lucide-react';
import { Post } from '../types';
import { Translations, Language } from '../i18n/translations';
import { FestiveAudioControlBar } from './FestiveAudioControlBar';
import { festiveAudio } from '../utils/festiveAudio';

interface StoryDetailModalProps {
  post: Post | null;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, userName: string, country: string, text: string) => void;
  onTriggerConfetti: () => void;
  t: Translations;
  language: Language;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  post,
  onClose,
  isLiked,
  onToggleLike,
  onAddComment,
  onTriggerConfetti,
  t,
  language,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentCountry, setCommentCountry] = useState(language === 'ne' ? '🇳🇵 नेपाल' : '🇳🇵 Nepal');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const isVideo = post?.mediaType === 'video';
  const isTihar = post?.category === 'tihar_lights' || post?.category === 'bhai_tika' || post?.category === 'deusi_bhailo';

  // Automatically play traditional Nepali festive background audio whenever a video post is viewed
  useEffect(() => {
    if (post && post.mediaType === 'video') {
      const targetTrack = isTihar ? 'deusi' : 'malshree';
      festiveAudio.playTrack(targetTrack);
    }

    return () => {
      // Pause when leaving modal if it was a video
      if (post && post.mediaType === 'video') {
        festiveAudio.stop();
      }
    };
  }, [post?.id, post?.mediaType, isTihar]);

  useEffect(() => {
    setCommentCountry(language === 'ne' ? '🇳🇵 नेपाल' : '🇳🇵 Nepal');
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    onAddComment(post.id, commentName.trim(), commentCountry, commentText.trim());
    setCommentText('');
    onTriggerConfetti();
  };

  const handleShare = () => {
    const url = window.location.href.split('#')[0] + `#story-${post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-900 dark:text-stone-100">{post.userName}</span>
            <span>·</span>
            <span>{post.familyName}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
              <MapPin className="h-3 w-3" />
              {post.countryCode} {post.city}, {post.country}
            </span>
            {isVideo && (
              <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                <Video className="h-3 w-3" />
                <span>{t.videoFeedBadge}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Media Player: Interactive Video or Image */}
          {isVideo ? (
            <div className="space-y-4 mb-6">
              <div className="relative overflow-hidden rounded-2xl bg-black aspect-video max-h-[420px] w-full shadow-xl border border-stone-800">
                <video
                  src={post.mediaUrl}
                  poster={post.mediaAlt || undefined}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                  ref={(el) => {
                    if (el) {
                      el.volume = 1.0; // High volume clarity
                    }
                  }}
                  onError={(e) => {
                    // Fallback to decorative visual if external video fails
                    console.log('Video element fallback to interactive frame');
                  }}
                >
                  <source src={post.mediaUrl} type="video/mp4" />
                  <source src={post.mediaUrl} type="video/webm" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              {/* Prominent Background Audio Control Bar with Malshree / Deusi-Bhailo tunes */}
              <FestiveAudioControlBar
                t={t}
                language={language}
                defaultTrack={isTihar ? 'deusi' : 'malshree'}
                autoPlay={true}
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl bg-stone-950 aspect-[16/10] max-h-[380px] w-full relative mb-6">
              <img
                src={post.mediaUrl}
                alt={post.mediaAlt || post.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Title */}
          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
            {post.title}
          </h2>

          {/* Story Narrative */}
          <div className="mt-4 text-base leading-relaxed text-stone-700 dark:text-stone-200 whitespace-pre-line font-['Mukta',sans-serif]">
            {post.story}
          </div>

          {/* Auspicious Blessings Card */}
          {post.blessings && (
            <div className="mt-6 rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900/60 dark:from-amber-950/40 dark:to-stone-900">
              <div className="flex items-start gap-3">
                <span className="text-xl">🪔</span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-400">
                    {t.detailFamilyBlessingsTitle}
                  </div>
                  <p className="mt-1 text-sm italic font-medium text-amber-950 dark:text-amber-200">
                    "{post.blessings}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar (Like & Share) */}
          <div className="mt-6 flex items-center justify-between border-y border-stone-100 py-3 dark:border-stone-800">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  onToggleLike(post.id);
                  if (!isLiked) onTriggerConfetti();
                }}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                  isLiked
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
                    : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-600' : ''}`} />
                <span className="font-mono tabular-nums">{post.likesCount} {t.detailHearts}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
                <span>{copied ? t.detailLinkCopied : t.detailShareStory}</span>
              </button>
            </div>

            <div className="text-xs text-stone-400 font-mono tabular-nums">
              {post.viewsCount} {t.detailViews}
            </div>
          </div>

          {/* Blessings & Comments Section */}
          <div className="mt-8">
            <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-amber-600" />
              <span>{t.detailBlessingsHeading} ({post.comments.length})</span>
            </h3>

            {/* Existing Comments List */}
            <div className="mt-4 space-y-3">
              {post.comments.length === 0 ? (
                <p className="text-sm italic text-stone-500 dark:text-stone-400 py-3">
                  {t.detailFirstToBless} {post.userName}!
                </p>
              ) : (
                post.comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-stone-100 bg-stone-50/80 p-3.5 text-sm dark:border-stone-800 dark:bg-stone-800/40"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        {c.userName} ({c.country})
                      </span>
                      <span>{c.timestamp}</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave a Blessing Form */}
            <form onSubmit={handleSubmitComment} className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-800/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-3">
                {t.detailSendBlessingHeader}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.detailNamePlaceholder}
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={t.detailLocationPlaceholder}
                    value={commentCountry}
                    onChange={(e) => setCommentCountry(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={t.detailMessagePlaceholder}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors shrink-0 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{t.detailBlessBtn}</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
