import React, { useState } from 'react';
import { X, Upload, ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Post, FestivalCategory } from '../types';
import { COUNTRIES_LIST } from '../data/seedData';
import { FESTIVE_ARTWORKS } from '../utils/festiveArtworks';
import { compressImageFile } from '../utils/imageCompressor';
import { Translations, Language, CATEGORY_NAMES_NEPALI } from '../i18n/translations';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'viewsCount' | 'comments' | 'isApproved'>) => Promise<void> | void;
  onTriggerConfetti: () => void;
  t: Translations;
  language: Language;
}

const CATEGORY_DEFINITIONS: { id: FestivalCategory; enLabel: string; icon: string; defaultArt: string }[] = [
  { id: 'dashain_tika', enLabel: 'Dashain Tika & Jamara', icon: '🌾', defaultArt: FESTIVE_ARTWORKS.dashain_tika },
  { id: 'tihar_lights', enLabel: 'Tihar & Laxmi Puja (Lights)', icon: '🪔', defaultArt: FESTIVE_ARTWORKS.tihar_lights },
  { id: 'bhai_tika', enLabel: 'Sacred Bhai Tika', icon: '🌈', defaultArt: FESTIVE_ARTWORKS.bhai_tika },
  { id: 'deusi_bhailo', enLabel: 'Deusi Bhailo Celebration', icon: '🪕', defaultArt: FESTIVE_ARTWORKS.diaspora_gathering },
  { id: 'jamara_ghatasthapana', enLabel: 'Ghatasthapana & Jamara', icon: '🌱', defaultArt: FESTIVE_ARTWORKS.dashain_tika },
  { id: 'diaspora_gathering', enLabel: 'Global Diaspora Family Feast', icon: '🌍', defaultArt: FESTIVE_ARTWORKS.diaspora_gathering },
];

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  onTriggerConfetti,
  t,
  language,
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
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMediaUrl(event.target.result as string);
          setCustomFileLoaded(true);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    setMediaType('image');
    try {
      setIsCompressing(true);
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
    setMediaType('image');
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
        familyName: familyName.trim() || (language === 'ne' ? `${userName.trim()} परिवार` : `${userName.trim()} Family`),
        country,
        countryCode,
        city: city.trim(),
        category,
        title: title.trim(),
        story: story.trim(),
        blessings: blessings.trim() || (language === 'ne' ? 'सबैलाई सुख, शान्ति र समृद्धिको हार्दिक मंगलमय शुभकामना!' : 'Wishing happiness, peace, and prosperity to everyone worldwide!'),
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
                {t.submitModalTitle}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                ☁️ Live Cloud Sync
              </span>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {t.submitStepIndicator.replace('{step}', String(step))}
            </div>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 disabled:opacity-40 cursor-pointer"
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
                  {t.submitStep1Title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.submitStep1Desc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.submitNamePlaceholder}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitFamilyLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.submitFamilyPlaceholder}
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60">
                {t.submitStep1Tip}
              </div>
            </div>
          )}

          {/* STEP 2: Location */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  {t.submitStep2Title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.submitStep2Desc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitCountryLabel}
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
                  {t.submitCityLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.submitCityPlaceholder}
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
                  {t.submitStep3Title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.submitStep3Desc}
                </p>
              </div>

              {/* Festival Type Selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  {t.submitTraditionLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORY_DEFINITIONS.map((cat) => {
                    const label = language === 'ne' ? CATEGORY_NAMES_NEPALI[cat.id] || cat.enLabel : cat.enLabel;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id);
                          if (!customFileLoaded) {
                            setMediaUrl(cat.defaultArt);
                          }
                        }}
                        className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-colors cursor-pointer ${
                          category === cat.id
                            ? 'border-amber-500 bg-amber-50 text-amber-950 font-semibold dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-600'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300 dark:border-stone-800 dark:text-stone-300'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Zone */}
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                  {t.submitUploadLabel}
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="flex h-32 w-full sm:w-1/2 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-500 dark:border-stone-700 dark:hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 dark:bg-stone-950 transition-colors p-4 text-center">
                    {isCompressing ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-6 w-6 text-amber-600 animate-spin mb-1" />
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          {t.submitCompressing}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-stone-400 group-hover:text-amber-600 mb-1" />
                        <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          {t.submitUploadClick}
                        </span>
                        <span className="text-[11px] text-stone-400 mt-0.5">
                          {t.submitUploadSubtext}
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
                    {mediaType === 'video' ? (
                      <video
                        src={mediaUrl}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={mediaUrl}
                        alt="Celebration Preview"
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                      {customFileLoaded ? (mediaType === 'video' ? '🎥 Video' : t.submitReadyUpload) : t.submitSelectedArtwork}
                    </div>
                  </div>
                </div>

                {/* Video Clip Preset Quick Option */}
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {language === 'ne' ? 'वा भिडियो क्लिप छान्नुहोस्:' : 'Or pick festive video clip:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaType('video');
                      setMediaUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                      setCustomFileLoaded(true);
                    }}
                    className="rounded-lg border border-red-300 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 cursor-pointer"
                  >
                    🎥 {language === 'ne' ? 'मालश्री भिडियो' : 'Malshree Video'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaType('video');
                      setMediaUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4');
                      setCustomFileLoaded(true);
                    }}
                    className="rounded-lg border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300 cursor-pointer"
                  >
                    🪔 {language === 'ne' ? 'देउसी भिडियो' : 'Deusi Video'}
                  </button>
                </div>

                {/* Preset Art Alternatives */}
                <div className="mt-3">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">
                    {t.submitPresetAlternative}
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {Object.entries(FESTIVE_ARTWORKS).map(([key, svgUrl]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectPresetArt(svgUrl)}
                        className={`h-11 w-16 shrink-0 overflow-hidden rounded-md border transition-all cursor-pointer ${
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
                  {t.submitStep4Title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.submitStep4Desc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.submitTitlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitStoryLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.submitStoryPlaceholder}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white p-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.submitBlessingsLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.submitBlessingsPlaceholder}
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 disabled:opacity-40 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.submitBackBtn}</span>
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
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <span>{t.submitContinueBtn}</span>
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
                    <span>{t.submitPublishingBtn}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>{t.submitPublishBtn}</span>
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
