export type FestivalCategory = 
  | 'dashain_tika'
  | 'tihar_lights'
  | 'bhai_tika'
  | 'deusi_bhailo'
  | 'jamara_ghatasthapana'
  | 'diaspora_gathering';

export interface Comment {
  id: string;
  userName: string;
  country: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userName: string;
  familyName: string;
  country: string;
  countryCode: string; // ISO or flag emoji
  city: string;
  category: FestivalCategory;
  title: string;
  story: string;
  blessings: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  mediaAlt?: string;
  timestamp: string;
  likesCount: number;
  viewsCount: number;
  comments: Comment[];
  isFeatured?: boolean;
  isApproved: boolean;
}

export interface SiteAnalytics {
  totalViews: number;
  totalLikes: number;
  totalPosts: number;
  uniqueCountries: number;
  lastUpdated: string;
}

export interface AdminAnnouncement {
  id: string;
  title: string;
  content: string;
  active: boolean;
  date: string;
}
