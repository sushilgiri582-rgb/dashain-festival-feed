export type Language = 'en' | 'ne';

export interface Translations {
  // Brand
  brandName: string;
  brandSubtitle: string;

  // Nav
  navFeed: string;
  navTraditions: string;
  navCreator: string;
  navBlessingsShower: string;
  navShareStory: string;
  navPetalsOn: string;
  navPetalsOff: string;
  navLightMode: string;
  navDarkMode: string;
  navMuteAudio: string;
  navPlayAudio: string;
  navAdminPortal: string;
  langNepali: string;
  langEnglish: string;

  // Hero
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroShareBtn: string;
  heroFlowerBtn: string;
  heroExploreWallBtn: string;
  heroManagedBy: string;
  heroCloudStatus: string;
  heroVillageQuote: string;
  heroTiharLightsBadge: string;
  heroTiharLightsDesc: string;
  heroOfficialNotice: string;

  // Stats
  statStories: string;
  statCountries: string;
  statBlessings: string;
  statCommunityLove: string;

  // Community Feed
  feedSectionKicker: string;
  feedSectionTitle: string;
  feedSectionSubtitle: string;
  feedAddStoryBtn: string;
  feedTabAll: string;
  feedTabDashain: string;
  feedTabTihar: string;
  feedTabBhaiTika: string;
  feedTabDeusi: string;
  feedTabDiaspora: string;
  feedSearchPlaceholder: string;
  feedClearSearch: string;
  feedAllCountries: string;
  feedSortLatest: string;
  feedSortLoved: string;
  feedSortBlessings: string;
  feedEmptyTitle: string;
  feedEmptyDesc: string;
  feedResetFilters: string;
  feedShareFirst: string;

  // Story Card
  cardBlessings: string;
  cardShare: string;
  cardCopied: string;
  cardFestivalMoment: string;
  cardUnlike: string;
  cardSendHeart: string;

  // Detail Modal
  detailFamilyBlessingsTitle: string;
  detailHearts: string;
  detailShareStory: string;
  detailLinkCopied: string;
  detailViews: string;
  detailBlessingsHeading: string;
  detailFirstToBless: string;
  detailSendBlessingHeader: string;
  detailNamePlaceholder: string;
  detailLocationPlaceholder: string;
  detailMessagePlaceholder: string;
  detailBlessBtn: string;

  // Submission Modal
  submitModalTitle: string;
  submitStepIndicator: string;
  submitStep1Title: string;
  submitStep1Desc: string;
  submitNameLabel: string;
  submitNamePlaceholder: string;
  submitFamilyLabel: string;
  submitFamilyPlaceholder: string;
  submitStep1Tip: string;
  submitStep2Title: string;
  submitStep2Desc: string;
  submitCountryLabel: string;
  submitCityLabel: string;
  submitCityPlaceholder: string;
  submitStep3Title: string;
  submitStep3Desc: string;
  submitTraditionLabel: string;
  submitUploadLabel: string;
  submitUploadClick: string;
  submitUploadSubtext: string;
  submitCompressing: string;
  submitReadyUpload: string;
  submitSelectedArtwork: string;
  submitPresetAlternative: string;
  submitStep4Title: string;
  submitStep4Desc: string;
  submitTitleLabel: string;
  submitTitlePlaceholder: string;
  submitStoryLabel: string;
  submitStoryPlaceholder: string;
  submitBlessingsLabel: string;
  submitBlessingsPlaceholder: string;
  submitBackBtn: string;
  submitContinueBtn: string;
  submitPublishBtn: string;
  submitPublishingBtn: string;

  // Traditions Guide
  traditionsKicker: string;
  traditionsTitle: string;
  traditionsDesc: string;
  traditionsDashainTab: string;
  traditionsTiharTab: string;
  traditionsPhase: string;
  traditionsRitual: string;
  traditionsJamaraTitle: string;
  traditionsJamaraDesc: string;
  traditionsJamaraLink: string;

  // Creator Profile & Footer
  creatorRole: string;
  creatorBio: string;
  creatorAdminBtn: string;
  creatorProfileKicker: string;
  creatorProfileTitle: string;
  creatorProfileDesc: string;
  creatorWhatsAppTitle: string;
  creatorWhatsAppAction: string;
  creatorFacebookTitle: string;
  creatorFacebookAction: string;
  creatorEmailTitle: string;
  creatorEmailAction: string;
  creatorQuickCopy: string;
  footerAbout: string;
  footerManagedBy: string;
  footerExploreTitle: string;
  footerFeedLink: string;
  footerTraditionsLink: string;
  footerCreatorLink: string;
  footerTriggerShower: string;
  footerContactsTitle: string;
  footerAdminAccess: string;
  footerCopyright: string;
  footerBlessingText: string;
  footerSubhakamana: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  adminSignOut: string;
  adminOwnerVerifyTitle: string;
  adminOwnerVerifyDesc: string;
  adminPinPlaceholder: string;
  adminIncorrectPin: string;
  adminUnlockBtn: string;
  adminPinHint: string;
  adminAnalyticsHeading: string;
  adminTotalSubs: string;
  adminTotalViews: string;
  adminTotalLikes: string;
  adminTotalCountries: string;
  adminBroadcastHeading: string;
  adminAnnounceTitlePlaceholder: string;
  adminAnnounceContentPlaceholder: string;
  adminAnnounceCheckbox: string;
  adminAnnounceSaved: string;
  adminAnnounceUpdateBtn: string;
  adminAnnounceLiveNote: string;
  adminModerationHeading: string;
  adminExportJson: string;
  adminResetSeed: string;
  adminColUserFamily: string;
  adminColLocation: string;
  adminColTitle: string;
  adminColLikes: string;
  adminColActions: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'Mero Dashain & Tihar',
    brandSubtitle: 'Global Feed',

    navFeed: 'Community Feed',
    navTraditions: 'Festival Calendar',
    navCreator: 'Creator Profile',
    navBlessingsShower: 'Blessings Shower',
    navShareStory: 'Share Story',
    navPetalsOn: 'Petals On',
    navPetalsOff: 'Petals Off',
    navLightMode: 'Switch to Light Mode',
    navDarkMode: 'Switch to Dark Mode',
    navMuteAudio: 'Mute ambient chimes',
    navPlayAudio: 'Play peaceful festive chimes',
    navAdminPortal: 'Creator & Admin Dashboard (Sushil Giri)',
    langNepali: 'नेपाली',
    langEnglish: 'English',

    heroKicker: 'Bada Dashain & Tihar (Deepawali) Celebration · Nepal & Global Diaspora',
    heroTitle: 'Where Nepali Hearts Unite Across the Globe',
    heroDesc: "From the terraced green hills of Nepal to vibrant diaspora homes worldwide. Share your family's golden Jamara, scarlet Vijaya Dashami Tika, glowing Tihar diyas, and authentic cultural blessings.",
    heroShareBtn: 'Share Your Family Story',
    heroFlowerBtn: 'Send Sayapatri Shower',
    heroExploreWallBtn: 'Explore Global Wall',
    heroManagedBy: 'Platform Managed by Sushil Giri',
    heroCloudStatus: 'Global Cloud Backend: Real-Time Synced for All Visitors',
    heroVillageQuote: '"Once a year, touch the sky and renew the spirit."',
    heroTiharLightsBadge: 'Tihar Lights',
    heroTiharLightsDesc: '108 sacred oil diyas glowing',
    heroOfficialNotice: 'Official Notice',

    statStories: 'Global Stories Shared',
    statCountries: 'Countries Represented',
    statBlessings: 'Blessings & Hearts (❤️)',
    statCommunityLove: 'Worldwide Community Love',

    feedSectionKicker: 'Global Wall of Memories',
    feedSectionTitle: 'Community Celebrations & Blessings',
    feedSectionSubtitle: 'Explore authentic moments from Nepali families in Nepal and worldwide.',
    feedAddStoryBtn: 'Add Your Family Story',
    feedTabAll: 'All Stories',
    feedTabDashain: '🌾 Dashain Tika & Jamara',
    feedTabTihar: '🪔 Tihar Lights & Diyas',
    feedTabBhaiTika: '🌈 Bhai Tika',
    feedTabDeusi: '🪕 Deusi Bhailo',
    feedTabDiaspora: '🌍 Diaspora Worldwide',
    feedSearchPlaceholder: 'Search by family name, city, country, or tradition...',
    feedClearSearch: 'Clear',
    feedAllCountries: '🌍 All Countries',
    feedSortLatest: 'Latest First',
    feedSortLoved: 'Most Loved (❤️)',
    feedSortBlessings: 'Most Blessings',
    feedEmptyTitle: 'No stories match your filter criteria',
    feedEmptyDesc: 'Try adjusting your search terms or country filter, or be the first to share a story from this area!',
    feedResetFilters: 'Reset Filters',
    feedShareFirst: 'Share First Story Here',

    cardBlessings: 'blessings',
    cardShare: 'Share',
    cardCopied: 'Copied',
    cardFestivalMoment: 'Festival Moment',
    cardUnlike: 'Unlike this story',
    cardSendHeart: 'Send heart / blessing',

    detailFamilyBlessingsTitle: 'Family Festival Blessings (Ashirwad)',
    detailHearts: 'Hearts',
    detailShareStory: 'Share Story',
    detailLinkCopied: 'Link Copied!',
    detailViews: 'views',
    detailBlessingsHeading: 'Community Blessings',
    detailFirstToBless: 'Be the first to send festival blessings to',
    detailSendBlessingHeader: 'Send Your Shubhakamana / Blessing',
    detailNamePlaceholder: 'Your Name (e.g. Ramesh Giri)',
    detailLocationPlaceholder: 'Your Location (e.g. 🇳🇵 Nepal or 🇬🇧 London)',
    detailMessagePlaceholder: 'Type your festival wish or blessings...',
    detailBlessBtn: 'Bless',

    submitModalTitle: 'Share Your Dashain & Tihar Celebration',
    submitStepIndicator: 'Step {step} of 4 · Saved instantly to Global Cloud Database for all worldwide visitors',
    submitStep1Title: '1. Tell us who is celebrating',
    submitStep1Desc: 'Your name and family house will appear proudly on the global community wall.',
    submitNameLabel: 'Your Name / Submitter *',
    submitNamePlaceholder: 'e.g. Sushil Giri or Aarav Sharma',
    submitFamilyLabel: 'Family / House Name (Ghar / Parivar)',
    submitFamilyPlaceholder: 'e.g. Giri Parivar or Sharma Niwas',
    submitStep1Tip: '✨ Tip: Your post will be permanently saved to our shared cloud database and immediately visible to families across Nepal and worldwide.',
    submitStep2Title: '2. Where are you celebrating from?',
    submitStep2Desc: 'Pin your festival lights to our global diaspora network.',
    submitCountryLabel: 'Country *',
    submitCityLabel: 'City / Town / Place *',
    submitCityPlaceholder: 'e.g. Kathmandu, Pokhara, Dallas TX, London, or Sydney',
    submitStep3Title: '3. Festival Category & Celebration Photo/Video',
    submitStep3Desc: 'Upload your photo/video or choose from our authentic cultural artworks.',
    submitTraditionLabel: 'Select Festival Tradition',
    submitUploadLabel: 'Upload Your Festival Media (Optimized for Instant Cloud Upload)',
    submitUploadClick: 'Click to Browse File',
    submitUploadSubtext: 'Photos auto-compressed for lightning speed',
    submitCompressing: 'Optimizing image for cloud...',
    submitReadyUpload: 'Your Upload (Ready)',
    submitSelectedArtwork: 'Selected Artwork',
    submitPresetAlternative: 'Or select a festival illustration preset:',
    submitStep4Title: '4. Your Celebration Story & Auspicious Blessings',
    submitStep4Desc: 'Pour your heart out—celebration rituals, food, memories, or wishes.',
    submitTitleLabel: 'Story Title *',
    submitTitlePlaceholder: 'e.g. Gathering 4 Generations for Tika or 108 Diyas on our Patio',
    submitStoryLabel: 'Your Story & Memories *',
    submitStoryPlaceholder: 'Share how you are celebrating Dashain or Tihar this year. Talk about family elders, Sel Roti, Tika rituals, Deusi songs, or memories of Nepal...',
    submitBlessingsLabel: 'Festival Blessings / Shubhakamana to the World',
    submitBlessingsPlaceholder: 'e.g. May Durga Bhavani and Mata Laxmi shower prosperity upon all!',
    submitBackBtn: 'Back',
    submitContinueBtn: 'Continue',
    submitPublishBtn: 'Publish Globally',
    submitPublishingBtn: 'Saving to Global Database...',

    traditionsKicker: 'Living Heritage & Vedic Rituals',
    traditionsTitle: 'Sacred Traditions of Dashain & Tihar',
    traditionsDesc: 'Learn the deep spiritual symbolism and daily rituals preserved across centuries by Nepali families.',
    traditionsDashainTab: '🌾 Bada Dashain (15 Days)',
    traditionsTiharTab: '🪔 Tihar & Deepawali (5 Days)',
    traditionsPhase: 'Phase',
    traditionsRitual: 'Ritual Tradition',
    traditionsJamaraTitle: 'Why is Jamara Sacred?',
    traditionsJamaraDesc: "Sown on Ghatasthapana in pure sand and grown in darkness, the tender golden barley sprouts absorb Durga Bhavani's divine energy and bestow vitality.",
    traditionsJamaraLink: 'View Jamara Stories in Feed →',

    creatorRole: 'Platform Manager & Community Lead',
    creatorBio: 'Dedicated to connecting Nepalis worldwide for Dashain & Tihar celebrations.',
    creatorAdminBtn: 'Admin Login Portal',
    creatorProfileKicker: 'Official Creator & Contact Profile',
    creatorProfileTitle: 'Platform Managed by Sushil Giri',
    creatorProfileDesc: 'Have questions, want to partner, suggest community initiatives, or report an entry? Reach out directly through the official channels below:',
    creatorWhatsAppTitle: 'WhatsApp Chat',
    creatorWhatsAppAction: 'Click to Chat Directly →',
    creatorFacebookTitle: 'Facebook Profile',
    creatorFacebookAction: 'Connect on Facebook →',
    creatorEmailTitle: 'Email Address',
    creatorEmailAction: 'Send Direct Email →',
    creatorQuickCopy: 'Quick Copy:',
    footerAbout: 'A community celebration portal uniting Nepali families and the worldwide diaspora with cultural stories, Sayapatri memories, Jamara blessings, and sparkling Tihar lights.',
    footerManagedBy: 'Platform Managed by Sushil Giri',
    footerExploreTitle: 'Explore Platform',
    footerFeedLink: 'Global Community Feed',
    footerTraditionsLink: 'Dashain & Tihar Traditions',
    footerCreatorLink: 'Creator Official Profile',
    footerTriggerShower: 'Trigger Sayapatri Blessing Shower 🌸',
    footerContactsTitle: 'Creator Official Contacts',
    footerAdminAccess: 'Owner / Admin Portal Access',
    footerCopyright: 'Mero Dashain & Tihar Global Feed. Platform Managed by Sushil Giri.',
    footerBlessingText: 'May peace, health, and prosperity reign in every household.',
    footerSubhakamana: '🇳🇵 शुभ विजया दशमी तथा शुभ दिपावली',

    adminTitle: 'Creator & Admin Dashboard',
    adminSubtitle: 'Managed by Sushil Giri · Exclusive Management Portal',
    adminSignOut: 'Sign Out',
    adminOwnerVerifyTitle: 'Owner Access Verification',
    adminOwnerVerifyDesc: 'Enter your secret creator PIN code to view platform analytics, moderate community submissions, and broadcast announcements.',
    adminPinPlaceholder: 'Enter 4-digit PIN (Default: 9860)',
    adminIncorrectPin: 'Incorrect passcode. Hint: Use owner PIN 9860',
    adminUnlockBtn: 'Unlock Creator Dashboard',
    adminPinHint: 'Default access passcode: 9860 (derived from WhatsApp: +977 9860228005)',
    adminAnalyticsHeading: 'Live Platform Analytics',
    adminTotalSubs: 'Total Submissions',
    adminTotalViews: 'Total Page Impressions',
    adminTotalLikes: 'Community Likes / Hearts',
    adminTotalCountries: 'Global Countries',
    adminBroadcastHeading: 'Broadcast Official Admin Announcement',
    adminAnnounceTitlePlaceholder: 'Announcement Title',
    adminAnnounceContentPlaceholder: 'Announcement message to all global visitors...',
    adminAnnounceCheckbox: 'Display announcement banner across top of site',
    adminAnnounceSaved: 'Saved & Broadcast!',
    adminAnnounceUpdateBtn: 'Update Announcement',
    adminAnnounceLiveNote: 'Changes appear immediately for all visitors.',
    adminModerationHeading: 'Community Entries Moderation',
    adminExportJson: 'Export JSON Backup',
    adminResetSeed: 'Reset Seed',
    adminColUserFamily: 'User & Family',
    adminColLocation: 'Location',
    adminColTitle: 'Title',
    adminColLikes: 'Likes',
    adminColActions: 'Moderation Actions',
  },

  ne: {
    brandName: 'हाम्रो दसैँ र तिहार',
    brandSubtitle: 'ग्लोबल फिड',

    navFeed: 'समुदाय फिड',
    navTraditions: 'चाडपर्व पात्रो',
    navCreator: 'सञ्चालक परिचय',
    navBlessingsShower: 'शुभकामना वर्षा',
    navShareStory: 'कथा सुनाउनुहोस्',
    navPetalsOn: 'सयपत्री चालु',
    navPetalsOff: 'सयपत्री बन्द',
    navLightMode: 'उज्यालो मोड',
    navDarkMode: 'गाढा मोड',
    navMuteAudio: 'धुन बन्द गर्नुहोस्',
    navPlayAudio: 'मधुर चाडपर्व धुन सुन्नुहोस्',
    navAdminPortal: 'सञ्चालक ड्यासबोर्ड (सुशील गिरी)',
    langNepali: 'नेपाली',
    langEnglish: 'English',

    heroKicker: 'बडा दसैँ तथा शुभ तिहार (दीपावली) उत्सव · नेपाल र विश्वभरि छरिएका नेपालीहरू',
    heroTitle: 'विश्वभरका नेपाली मनहरू जोड्ने पावन उत्सव',
    heroDesc: 'नेपालका हरियाली डाँडाकाँडादेखि विश्वका कुनाकुनासम्म। परिवारको पहेंलो जमरा, रातो टीका, चहकिला दियो र मौलिक सांस्कृतिक आशिर्वादहरू आदानप्रदान गर्नुहोस्।',
    heroShareBtn: 'आफ्नो पारिवारिक कथा सुनाउनुहोस्',
    heroFlowerBtn: 'सयपत्री फूल वर्षाउनुहोस्',
    heroExploreWallBtn: 'ग्लोबल भित्ता हेर्नुहोस्',
    heroManagedBy: 'मञ्च सञ्चालन: सुशील गिरी',
    heroCloudStatus: 'ग्लोबल क्लाउड डाटाबेस: सबैका लागि प्रत्यक्ष सिंक',
    heroVillageQuote: '"वर्षमा एकपटक धर्ती छोड्नुपर्छ र आत्मालाई पवित्र बनाउनुपर्छ।"',
    heroTiharLightsBadge: 'तिहारको उज्यालो',
    heroTiharLightsDesc: '१०८ पावन माटोका दियोहरू प्रज्वलित',
    heroOfficialNotice: 'आधिकारिक सूचना',

    statStories: 'साझा गरिएका कथाहरू',
    statCountries: 'सहभागी देशहरू',
    statBlessings: 'शुभकामना तथा आशिर्वाद (❤️)',
    statCommunityLove: 'विश्वव्यापी आत्मियता',

    feedSectionKicker: 'स्मृतिहरूको विश्वव्यापी भित्ता',
    feedSectionTitle: 'सामुदायिक उत्सव तथा शुभकामनाहरू',
    feedSectionSubtitle: 'नेपाल र विश्वका विभिन्न देशहरूबाट नेपाली परिवारहरूका आत्मीय सांस्कृतिक क्षणहरू।',
    feedAddStoryBtn: 'नयाँ कथा थप्नुहोस्',
    feedTabAll: 'सबै कथाहरू',
    feedTabDashain: '🌾 दसैँ टीका र जमरा',
    feedTabTihar: '🪔 तिहारका बत्ती र दियो',
    feedTabBhaiTika: '🌈 पावन भाइटीका',
    feedTabDeusi: '🪕 देउसी-भैलो परम्परा',
    feedTabDiaspora: '🌍 परदेशबाट डायस्पोरा',
    feedSearchPlaceholder: 'परिवारको नाम, सहर, देश वा चाडपर्व अनुसार खोज्नुहोस्...',
    feedClearSearch: 'हटाउनुहोस्',
    feedAllCountries: '🌍 सबै देशहरू',
    feedSortLatest: 'भर्खरै थपिएका',
    feedSortLoved: 'धेरै मन पराइएका (❤️)',
    feedSortBlessings: 'धेरै आशिर्वाद प्राप्त',
    feedEmptyTitle: 'खोजिएका कुनै कथाहरू भेटिएनन्',
    feedEmptyDesc: 'कृपया खोजी शब्द बदल्नुहोस् वा यो स्थानबाट पहिलो कथा साझा गर्नुहोस्!',
    feedResetFilters: 'फिल्टर हटाउनुहोस्',
    feedShareFirst: 'यहाँ पहिलो कथा सुनाउनुहोस्',

    cardBlessings: 'शुभकामना',
    cardShare: 'सेयर',
    cardCopied: 'कपि भयो',
    cardFestivalMoment: 'उत्सवको क्षण',
    cardUnlike: 'मन पराउन छोड्नुहोस्',
    cardSendHeart: 'आशिर्वाद / मन पराउनुहोस्',

    detailFamilyBlessingsTitle: 'पारिवारिक चाडपर्व आशिर्वाद',
    detailHearts: 'मन पराए',
    detailShareStory: 'कथा सेयर गर्नुहोस्',
    detailLinkCopied: 'लिङ्क कपि भयो!',
    detailViews: 'पटक हेरियो',
    detailBlessingsHeading: 'सामुदायिक शुभकामना तथा आशिर्वादहरू',
    detailFirstToBless: 'लाई सबैभन्दा पहिले चाडपर्वको शुभकामना पठाउनुहोस्',
    detailSendBlessingHeader: 'आफ्नो शुभकामना तथा आशिर्वाद पठाउनुहोस्',
    detailNamePlaceholder: 'तपाईँको शुभनाम (उदा. रमेश गिरी)',
    detailLocationPlaceholder: 'तपाईँको ठेगाना (उदा. नेपाल वा लन्डन)',
    detailMessagePlaceholder: 'शुभकामना सन्देश यहाँ लेख्नुहोस्...',
    detailBlessBtn: 'आशिर्वाद पठाउनुहोस्',

    submitModalTitle: 'दसैँ र तिहारको रमाइलो साझा गर्नुहोस्',
    submitStepIndicator: 'चरण {step} / ४ · विश्वभरका सबै पाहुनाहरूका लागि तत्काल क्लाउडमा सुरक्षित',
    submitStep1Title: '१. उत्सव मनाउने व्यक्तिको विवरण',
    submitStep1Desc: 'तपाईँको नाम र घर/परिवारको नाम ग्लोबल भित्तामा गर्वका साथ देखिनेछ।',
    submitNameLabel: 'तपाईँको शुभनाम *',
    submitNamePlaceholder: 'उदा. सुशील गिरी वा आरव शर्मा',
    submitFamilyLabel: 'परिवार वा घरको नाम (घर / परिवार)',
    submitFamilyPlaceholder: 'उदा. गिरी परिवार वा शर्मा निवास',
    submitStep1Tip: '✨ सुझाव: तपाईँको कथा क्लाउड डाटाबेसमा सधैंका लागि सुरक्षित हुनेछ र विश्वभरका परिवारहरूले तत्काल हेर्न सक्नेछन्।',
    submitStep2Title: '२. तपाईँ कहाँबाट मनाउँदै हुनुहुन्छ?',
    submitStep2Desc: 'हाम्रो विश्वव्यापी डायस्पोरा सञ्जालमा आफ्नो दीप बाल्नुहोस्।',
    submitCountryLabel: 'देश *',
    submitCityLabel: 'सहर / गाउँ / ठाउँ *',
    submitCityPlaceholder: 'उदा. काठमाडौं, पोखरा, डल्लास, लन्डन वा सिड्नी',
    submitStep3Title: '३. चाडपर्वको विधा र उत्सवको फोटो/भिडियो',
    submitStep3Desc: 'आफ्नो फोटो/भिडियो अपलोड गर्नुहोस् वा हाम्रा सांस्कृतिक कलाहरूबाट छान्नुहोस्।',
    submitTraditionLabel: 'चाडपर्वको परम्परा रोज्नुहोस्',
    submitUploadLabel: 'उत्सवको फोटो अपलोड गर्नुहोस् (क्लाउडका लागि छिटो र अनुकूलित)',
    submitUploadClick: 'फोटो छनोट गर्न क्लिक गर्नुहोस्',
    submitUploadSubtext: 'फोटोहरू स्वतः हलुका र तीव्र गतिमा अपलोड हुने गरी तयार हुन्छन्',
    submitCompressing: 'फोटो क्लाउडका लागि अनुकूलन गरिँदैछ...',
    submitReadyUpload: 'तपाईँको फोटो (तयार)',
    submitSelectedArtwork: 'छनोट गरिएको कला',
    submitPresetAlternative: 'वा चाडपर्वको कलात्मक चित्र छनोट गर्नुहोस्:',
    submitStep4Title: '४. तपाईँको कथा तथा संस्मरण र आशिर्वाद',
    submitStep4Desc: 'दसैँ-तिहारका सम्झनाहरू, सेलरोटी, जमरा, पिङ, देउसी वा शुभकामना मन खोलेर लेख्नुहोस्।',
    submitTitleLabel: 'शीर्षक राख्नुहोस् *',
    submitTitlePlaceholder: 'उदा. चार पुस्ता सँगै बसेर टीका लगाएको क्षण वा परदेशमा १०८ दियो',
    submitStoryLabel: 'तपाईँको कथा तथा संस्मरण *',
    submitStoryPlaceholder: 'यस वर्ष दसैँ वा तिहार कसरी मनाउँदै हुनुहुन्छ? परिवार, सेलरोटी, टीका, देउसीका गीत वा गाउँघरका सम्झनाहरू लेख्नुहोस्...',
    submitBlessingsLabel: 'शुभकामना *',
    submitBlessingsPlaceholder: 'उदा. दुर्गा भवानी र माता लक्ष्मीले सबैलाई सुख, शान्ति र समृद्धि प्रदान गरून्!',
    submitBackBtn: 'पछाडि',
    submitContinueBtn: 'अगाडि बढ्नुहोस्',
    submitPublishBtn: 'पब्लिश गर्नुहोस्',
    submitPublishingBtn: 'क्लाउडमा सुरक्षित हुँदैछ...',

    traditionsKicker: 'मौलिक संस्कृति र वैदिक विधि',
    traditionsTitle: 'दसैँ र तिहारका पावन परम्पराहरू',
    traditionsDesc: 'पुस्तौंदेखि नेपालीहरूले संरक्षण गर्दै आएका धार्मिक विधि र दैनिक पूजा परम्परा।',
    traditionsDashainTab: '🌾 बडा दसैँ (१५ दिन)',
    traditionsTiharTab: '🪔 तिहार तथा दीपावली (५ दिन)',
    traditionsPhase: 'चरण',
    traditionsRitual: 'धार्मिक परम्परा',
    traditionsJamaraTitle: 'जमरा किन पवित्र मानिन्छ?',
    traditionsJamaraDesc: 'घटस्थापनाका दिन शुद्ध बालुवामा छरिएर अँध्यारो कोठामा हुर्काइने पहेँलो जमराले दुर्गा भवानीको शक्ति, आरोग्य र दीर्घायु प्रदान गर्दछ।',
    traditionsJamaraLink: 'फिडमा जमराका कथाहरू हेर्नुहोस् →',

    creatorRole: 'मञ्च सञ्चालक तथा समुदाय संयोजक',
    creatorBio: 'विश्वभरका नेपालीहरूलाई दसैँ-तिहारको पावन अवसरमा जोड्न समर्पित।',
    creatorAdminBtn: 'सञ्चालक लगइन पोर्टल',
    creatorProfileKicker: 'सञ्चालकको आधिकारिक सम्पर्क',
    creatorProfileTitle: 'मञ्च सञ्चालन: सुशील गिरी',
    creatorProfileDesc: 'केही जिज्ञासा, सहकार्य, समुदाय पहलको सुझाव भएमा सिधै सम्पर्क गर्नुहोस्:',
    creatorWhatsAppTitle: 'ह्वाट्सएप च्याट',
    creatorWhatsAppAction: 'सिधै च्याट गर्नुहोस् →',
    creatorFacebookTitle: 'फेसबुक प्रोफाइल',
    creatorFacebookAction: 'फेसबुकमा जोडिनुहोस् →',
    creatorEmailTitle: 'इमेल ठेगाना',
    creatorEmailAction: 'इमेल पठाउनुहोस् →',
    creatorQuickCopy: 'छिटो प्रतिलिपि:',
    footerAbout: 'विश्वभरका नेपाली परिवारहरूलाई चाडपर्वका संस्मरण, सयपत्रीका माला, जमराको आशिर्वाद र तिहारको उज्यालोसँग जोड्ने सामुदायिक साझा थलो।',
    footerManagedBy: 'मञ्च सञ्चालन: सुशील गिरी',
    footerExploreTitle: 'मञ्च अन्वेषण',
    footerFeedLink: 'ग्लोबल समुदाय फिड',
    footerTraditionsLink: 'दसैँ-तिहार परम्परा',
    footerCreatorLink: 'सञ्चालक परिचय',
    footerTriggerShower: 'सयपत्री शुभकामना वर्षा 🌸',
    footerContactsTitle: 'आधिकारिक सम्पर्क विवरण',
    footerAdminAccess: 'सञ्चालक / एडमिन पोर्टल',
    footerCopyright: 'हाम्रो दसैँ र तिहार ग्लोबल फिड। मञ्च सञ्चालन: सुशील गिरी।',
    footerBlessingText: 'सबैको घरमा शान्ति, सुस्वास्थ्य र समृद्धि छाओस्।',
    footerSubhakamana: '🇳🇵 शुभ विजया दशमी तथा शुभ दीपावली',

    adminTitle: 'सञ्चालक तथा एडमिन ड्यासबोर्ड',
    adminSubtitle: 'सुशील गिरीद्वारा सञ्चालित · विशेष व्यवस्थापन पोर्टल',
    adminSignOut: 'लगआउट',
    adminOwnerVerifyTitle: 'सञ्चालक प्रमाणीकरण',
    adminOwnerVerifyDesc: 'प्लेटफर्म विश्लेषण, कथाहरूको प्रमाणीकरण र सूचना प्रसारण गर्न आफ्नो गोप्य पिन राख्नुहोस्।',
    adminPinPlaceholder: '४ अङ्कको पिन राख्नुहोस् (डिफल्ट: 9860)',
    adminIncorrectPin: 'गलत पिन कोड। सुझाव: सञ्चालक पिन 9860 प्रयोग गर्नुहोस्',
    adminUnlockBtn: 'ड्यासबोर्ड खोल्नुहोस्',
    adminPinHint: 'डिफल्ट पहुँच पिन: 9860 (ह्वाट्सएप +977 9860228005 बाट साभार)',
    adminAnalyticsHeading: 'प्रत्यक्ष प्लेटफर्म तथ्याङ्क',
    adminTotalSubs: 'कुल प्रविष्टिहरू',
    adminTotalViews: 'कुल अवलोकनहरू',
    adminTotalLikes: 'कुल आशिर्वाद / मन पराइएका',
    adminTotalCountries: 'सहभागी देशहरू',
    adminBroadcastHeading: 'आधिकारिक सूचना प्रसारण',
    adminAnnounceTitlePlaceholder: 'सूचनाको शीर्षक',
    adminAnnounceContentPlaceholder: 'विश्वभरका पाहुनाहरूका लागि सन्देश...',
    adminAnnounceCheckbox: 'वेबसाइटको शिरमा यो सूचना प्रदर्शन गर्नुहोस्',
    adminAnnounceSaved: 'सुरक्षित भयो र प्रसारण भयो!',
    adminAnnounceUpdateBtn: 'सूचना अपडेट गर्नुहोस्',
    adminAnnounceLiveNote: 'परिवर्तनहरू सबै प्रयोगकर्ताहरूका लागि तत्काल देखिनेछन्।',
    adminModerationHeading: 'कथाहरूको व्यवस्थापन',
    adminExportJson: 'JSON ब्याकअप डाउनलोड',
    adminResetSeed: 'सुरुवाती अवस्थामा फर्काउनुहोस्',
    adminColUserFamily: 'प्रयोगकर्ता र परिवार',
    adminColLocation: 'स्थान',
    adminColTitle: 'शीर्षक',
    adminColLikes: 'आशिर्वाद',
    adminColActions: 'कार्यहरू',
  },
};

export const CATEGORY_NAMES_NEPALI: Record<string, string> = {
  dashain_tika: 'विजया दशमी टीका',
  tihar_lights: 'तिहार तथा लक्ष्मी पूजा',
  bhai_tika: 'पावन भाइटीका',
  deusi_bhailo: 'देउसी-भैलो परम्परा',
  jamara_ghatasthapana: 'घटस्थापना तथा जमरा',
  diaspora_gathering: 'विश्वव्यापी डायस्पोरा जमघट',
};
