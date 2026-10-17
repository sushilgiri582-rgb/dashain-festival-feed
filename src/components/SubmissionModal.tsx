import React, { useState } from 'react';
import { X, Upload, ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Post, FestivalCategory } from '../types';
import { COUNTRIES_LIST } from '../data/seedData';
import { FESTIVE_ARTWORKS } from '../utils/festiveArtworks';
import { compressImageFile } from '../utils/imageCompressor';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'viewsCount' | 'comments' | 'isApproved'>) => Promise<void> | void;
  onTriggerConfetti: () => void;
}

const CATEGORIES: { id: FestivalCategory; label: string; icon: string; defaultArt: string }[] = [
  { id: 'dashain_tika', label: 'Dashain Tika & Jamara', icon: '🌾', defaultArt: FESTIVE_ARTWORKS.dashain_tika },
  { id: 'tihar_lights', label: 'Tihar & Laxmi Puja (Lights)', icon: '🪔', defaultArt: FESTIVE_ARTWORKS.tihar_lights },
  { id: 'bhai_tika', label: 'Sacred Bhai Tika', icon: '🌈', defaultArt: FESTIVE_ARTWORKS.bhai_tika },
  { id: 'deusi_bhailo', label: 'Deusi Bhailo Celebration', icon: '🪕', defaultArt: FESTIVE_ARTWORKS.diaspora_gathering },
  { id: 'jamara_ghatasthapana', label: 'Ghatasthapana & Jamara', icon: '🌱', defaultArt: FESTIVE_ARTWORKS.dashain_tika },
  { id: 'diaspora_gathering', label: 'Global Diaspora Family Feast', icon: '🌍', defaultArt: FESTIVE_ARTWORKS.diaspora_gathering },
];

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  onTriggerConfetti,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [country, setCountry] = useState('Nepal');
  const [countryCode, setCountryCode] = useState('🇳🇵');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<FestivalCategory>('dashain_tika');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [blessings, setBlessings] = useState('');
  const [mediaUrl, setMediaUrl] = useState<string>(FESTIVE_ARTWORKS.dashain_tika);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [customFileLoaded, setCustomFileLoaded] = useState(false);

  if (!isOpen) return null;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COUNTRIES_LIST.find((c) => c.name === e.target.value);
    if (selected) {
      setCountry(selected.name);
      setCountryCode(selected.flag);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      setMediaType('video');
    } else {
      setMediaType('image');
    }

    try {
      setIsCompressing(true);
      // Automatically optimize camera images for cloud storage (< 100KB)
      const compressedDataUrl = await compressImageFile(file, 900, 900);
      setMediaUrl(compressedDataUrl);
      setCustomFileLoaded(true);
    } catch (err) {
      console.warn('Image processing fallback:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSelectPresetArt = (art: string) => {
    setMediaUrl(art);
    setCustomFileLoaded(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !city || !title || !story) return;

    setIsSubmitting(true);
    try {
      await onSubmitPost({
        userName: userName.trim(),
        familyName: familyName.trim() || `${userName.trim()} Family`,
        country,
        countryCode,
        city: city.trim(),
        category,
        title: title.trim(),
        story: story.trim(),
        blessings: blessings.trim() || 'Wishing happiness, peace, and prosperity to everyone worldwide!',
        mediaType,
        mediaUrl,
        mediaAlt: title.trim(),
        isFeatured: false,
      });

      onTriggerConfetti();
      onClose();
      // Reset form
      setStep(1);
      setUserName('');
      setFamilyName('');
      setCity('');
      setTitle('');
      setStory('');
      setBlessings('');
      setCustomFileLoaded(false);
    } catch (error) {
      console.error('Failed to submit post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && onClose()}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-stone-900 dark:text-stone-50">
                Share Your Dashain & Tihar Celebration
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                ☁️ Live Cloud Sync
              </span>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Step {step} of 4 · Saved instantly to Global Cloud Database for all worldwide visitors
            </div>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="h-1 w-full bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* STEP 1: Personal & Family Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  1. Tell us who is celebrating
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Your name and family house will appear proudly on the global community wall.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Your Name / Submitter *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sushil Giri or Aarav Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Family / House Name (Ghar / Parivar)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Giri Parivar or Sharma Niwas"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60">
                ✨ Tip: Your post will be permanently saved to our shared cloud database and immediately visible to families across Nepal and worldwide.
              </div>
            </div>
          )}

          {/* STEP 2: Location */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  2. Where are you celebrating from?
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Pin your festival lights to our global diaspora network.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  City / Town / Place *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kathmandu, Pokhara, Dallas TX, London, or Sydney"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Festival Category & Media Upload */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  3. Festival Category & Celebration Photo/Video
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Upload your photo/video or choose from our authentic cultural artworks.
                </p>
              </div>

              {/* Festival Type Selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Select Festival Tradition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        if (!customFileLoaded) {
                          setMediaUrl(cat.defaultArt);
                        }
                      }}
                      className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-colors ${
                        category === cat.id
                          ? 'border-amber-500 bg-amber-50 text-amber-950 font-semibold dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-600'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:text-stone-300'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload Zone */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  Upload Your Festival Media (Optimized for Instant Cloud Upload)
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="flex h-32 w-full sm:w-1/2 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-500 dark:border-stone-700 dark:hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 dark:bg-stone-950 transition-colors p-4 text-center">
                    {isCompressing ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-6 w-6 text-amber-600 animate-spin mb-1" />
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          Optimizing image for cloud...
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-stone-400 group-hover:text-amber-600 mb-1" />
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          Click to Browse File
                        </span>
                        <span className="text-[11px] text-stone-400 mt-0.5">
                          Photos auto-compressed for lightning speed
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isCompressing}
                    />
                  </label>

                  {/* Preview Container */}
                  <div className="relative h-32 w-full sm:w-1/2 overflow-hidden rounded-xl border border-stone-200 bg-stone-950 dark:border-stone-800">
                    <img
                      src={mediaUrl}
                      alt="Celebration Preview"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                      {customFileLoaded ? 'Your Upload (Ready)' : 'Selected Artwork'}
                    </div>
                  </div>
                </div>

                {/* Preset Art Alternatives */}
                <div className="mt-3">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">
                    Or select a festival illustration preset:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {Object.entries(FESTIVE_ARTWORKS).map(([key, svgUrl]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectPresetArt(svgUrl)}
                        className={`h-11 w-16 shrink-0 overflow-hidden rounded-md border transition-all ${
                          mediaUrl === svgUrl
                            ? 'border-amber-500 ring-2 ring-amber-400'
                            : 'border-stone-300 opacity-70 hover:opacity-100 dark:border-stone-700'
                        }`}
                      >
                        <img src={svgUrl} alt={key} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Story Narrative & Blessings */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  4. Your Celebration Story & Auspicious Blessings
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Pour your heart out—celebration rituals, food, memories, or wishes.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gathering 4 Generations for Tika or 108 Diyas on our Patio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Your Story & Memories *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share how you are celebrating Dashain or Tihar this year. Talk about family elders, Sel Roti, Tika rituals, Deusi songs, or memories of Nepal..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white p-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Festival Blessings / Shubhakamana to the World
                </label>
                <input
                  type="text"
                  placeholder="e.g. May Durga Bhavani and Mata Laxmi shower prosperity upon all!"
                  value={blessings}
                  onChange={(e) => setBlessings(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
            {step > 1 ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !userName.trim()) return;
                  if (step === 2 && !city.trim()) return;
                  setStep(step + 1);
                }}
                disabled={(step === 1 && !userName.trim()) || (step === 2 && !city.trim())}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-40 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!title.trim() || !story.trim() || isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving to Global Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Publish Globally</span>
                  </>
                )}
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
