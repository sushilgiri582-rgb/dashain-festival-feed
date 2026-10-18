import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Trash2, Star, Eye, EyeOff, Download, RefreshCw, Megaphone, Check, AlertCircle } from 'lucide-react';
import { Post, SiteAnalytics, AdminAnnouncement } from '../types';
import { Translations, Language } from '../i18n/translations';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  analytics: SiteAnalytics;
  announcement: AdminAnnouncement | null;
  isAdminLoggedIn: boolean;
  onAdminLogin: (pin: string) => boolean;
  onAdminLogout: () => void;
  onToggleApprove: (postId: string) => void;
  onToggleFeature: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onUpdateAnnouncement: (title: string, content: string, active: boolean) => void;
  onResetSeedData: () => void;
  t: Translations;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  posts,
  analytics,
  announcement,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  onToggleApprove,
  onToggleFeature,
  onDeletePost,
  onUpdateAnnouncement,
  onResetSeedData,
  t,
  language,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Announcement Form State
  const [announceTitle, setAnnounceTitle] = useState(
    announcement?.title || (language === 'ne' ? 'शुभ विजया दशमी तथा दीपावली २०८३ को मंगलमय शुभकामना!' : 'Happy Vijaya Dashami & Deepawali 2026!')
  );
  const [announceContent, setAnnounceContent] = useState(
    announcement?.content || (language === 'ne' ? 'विश्वभर रहनुभएका सम्पूर्ण नेपाली आमाबुवा, दाजुभाइ तथा दिदीबहिनीहरूमा सुख, शान्ति, सुस्वास्थ्य र दीर्घायुको हार्दिक मंगलमय शुभकामना — मञ्च सञ्चालक सुशील गिरी।' : 'Wishing all Nepali families across the world immense prosperity, health, and joy from Platform Manager Sushil Giri.')
  );
  const [announceActive, setAnnounceActive] = useState(announcement ? announcement.active : true);
  const [announceSaved, setAnnounceSaved] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdminLogin(pinInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPinInput('');
    }
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement(announceTitle, announceContent, announceActive);
    setAnnounceSaved(true);
    setTimeout(() => setAnnounceSaved(false), 2000);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ posts, analytics }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mero_dashain_tihar_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 bg-amber-50/40 px-6 py-4 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-stone-900 dark:text-stone-50">
                {t.adminTitle}
              </h2>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {t.adminSubtitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={onAdminLogout}
                className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
              >
                {t.adminSignOut}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* If NOT logged in: Show PIN Lock Screen */}
          {!isAdminLoggedIn ? (
            <div className="mx-auto max-w-md py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <Lock className="h-7 w-7" />
              </div>

              <h3 className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-stone-900 dark:text-stone-100">
                {t.adminOwnerVerifyTitle}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-['Mukta',sans-serif]">
                {t.adminOwnerVerifyDesc}
              </p>

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder={t.adminPinPlaceholder}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setLoginError(false);
                    }}
                    className="w-full text-center tracking-widest text-lg font-mono rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                  />
                </div>

                {loginError && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{t.adminIncorrectPin}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-red-600 to-amber-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105 transition-all cursor-pointer"
                >
                  {t.adminUnlockBtn}
                </button>

                <div className="pt-2 text-xs text-stone-400 font-['Mukta',sans-serif]">
                  {t.adminPinHint}
                </div>
              </form>
            </div>
          ) : (
            /* Logged In: Full Admin Console */
            <div className="space-y-8">
              
              {/* Analytics Metric Cards */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3">
                  {t.adminAnalyticsHeading}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                    <div className="text-xs text-stone-500 dark:text-stone-400">{t.adminTotalSubs}</div>
                    <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                      {posts.length}
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                    <div className="text-xs text-stone-500 dark:text-stone-400">{t.adminTotalViews}</div>
                    <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                      {analytics.totalViews.toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                    <div className="text-xs text-stone-500 dark:text-stone-400">{t.adminTotalLikes}</div>
                    <div className="text-2xl font-bold font-mono text-red-600 dark:text-red-400 mt-1">
                      {posts.reduce((acc, p) => acc + p.likesCount, 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
                    <div className="text-xs text-stone-500 dark:text-stone-400">{t.adminTotalCountries}</div>
                    <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      {new Set(posts.map(p => p.country)).size}
                    </div>
                  </div>
                </div>
              </div>

              {/* Broadcast Official Announcement */}
              <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {t.adminBroadcastHeading}
                  </h4>
                </div>

                <form onSubmit={handleSaveAnnouncement} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={t.adminAnnounceTitlePlaceholder}
                      value={announceTitle}
                      onChange={(e) => setAnnounceTitle(e.target.value)}
                      className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                    />

                    <label className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={announceActive}
                        onChange={(e) => setAnnounceActive(e.target.checked)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                      />
                      <span>{t.adminAnnounceCheckbox}</span>
                    </label>
                  </div>

                  <textarea
                    rows={2}
                    placeholder={t.adminAnnounceContentPlaceholder}
                    value={announceContent}
                    onChange={(e) => setAnnounceContent(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 bg-white p-2.5 text-xs text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      {t.adminAnnounceLiveNote}
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
                    >
                      {announceSaved ? <Check className="h-3.5 w-3.5" /> : null}
                      <span>{announceSaved ? t.adminAnnounceSaved : t.adminAnnounceUpdateBtn}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Submissions Moderation Table */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {t.adminModerationHeading} ({posts.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportData}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-300 px-2.5 py-1 text-xs text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>{t.adminExportJson}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onResetSeedData}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-300 px-2.5 py-1 text-xs text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
                      title="Reset stories to default seed data"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>{t.adminResetSeed}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 max-h-80 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800 sticky top-0">
                      <tr>
                        <th className="px-3.5 py-2.5 font-semibold">{t.adminColUserFamily}</th>
                        <th className="px-3.5 py-2.5 font-semibold">{t.adminColLocation}</th>
                        <th className="px-3.5 py-2.5 font-semibold">{t.adminColTitle}</th>
                        <th className="px-3.5 py-2.5 font-semibold">{t.adminColLikes}</th>
                        <th className="px-3.5 py-2.5 font-semibold text-right">{t.adminColActions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                          <td className="px-3.5 py-2.5 whitespace-nowrap">
                            <div className="font-semibold text-stone-900 dark:text-stone-100">
                              {post.userName}
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400">
                              {post.familyName}
                            </div>
                          </td>
                          <td className="px-3.5 py-2.5 whitespace-nowrap text-stone-600 dark:text-stone-400">
                            {post.countryCode} {post.city}
                          </td>
                          <td className="px-3.5 py-2.5 max-w-[200px] truncate text-stone-800 dark:text-stone-200">
                            {post.title}
                          </td>
                          <td className="px-3.5 py-2.5 font-mono tabular-nums text-stone-600 dark:text-stone-400">
                            {post.likesCount}
                          </td>
                          <td className="px-3.5 py-2.5 text-right whitespace-nowrap space-x-1.5">
                            {/* Toggle Feature */}
                            <button
                              type="button"
                              onClick={() => onToggleFeature(post.id)}
                              className={`rounded p-1 transition-colors cursor-pointer ${
                                post.isFeatured
                                  ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                                  : 'text-stone-400 hover:text-stone-600'
                              }`}
                              title={post.isFeatured ? 'Unpin from featured' : 'Pin as featured'}
                            >
                              <Star className={`h-3.5 w-3.5 ${post.isFeatured ? 'fill-amber-500' : ''}`} />
                            </button>

                            {/* Toggle Approve / Hide */}
                            <button
                              type="button"
                              onClick={() => onToggleApprove(post.id)}
                              className={`rounded p-1 transition-colors cursor-pointer ${
                                post.isApproved
                                  ? 'text-emerald-600 hover:text-emerald-700'
                                  : 'text-red-500 hover:text-red-600'
                              }`}
                              title={post.isApproved ? 'Hide from public feed' : 'Approve for public feed'}
                            >
                              {post.isApproved ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete post "${post.title}"?`)) {
                                  onDeletePost(post.id);
                                }
                              }}
                              className="rounded p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete post permanently"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
