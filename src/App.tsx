/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Post, SiteAnalytics, AdminAnnouncement } from './types';
import { INITIAL_POSTS } from './data/seedData';
import { Navbar } from './components/Navbar';
import { FestiveHero } from './components/FestiveHero';
import { PetalCanvas } from './components/PetalCanvas';
import { CommunityFeed } from './components/CommunityFeed';
import { TraditionsGuide } from './components/TraditionsGuide';
import { CreatorProfile } from './components/CreatorProfile';
import { Footer } from './components/Footer';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SubmissionModal } from './components/SubmissionModal';
import { AdminDashboard } from './components/AdminDashboard';
import {
  seedInitialPostsIfEmpty,
  subscribeToGlobalPosts,
  createGlobalPost,
  togglePostLikeInFirestore,
  incrementPostViewsInFirestore,
  addCommentToPostInFirestore,
  setPostApprovalInFirestore,
  setPostFeaturedInFirestore,
  deletePostFromFirestore,
  subscribeToAnnouncement,
  updateAnnouncementInFirestore,
  subscribeToSiteAnalytics,
} from './services/postsService';

const STORAGE_KEYS = {
  LIKES: 'mero_dashain_likes_v1',
  THEME: 'mero_dashain_theme_v1',
  PETALS: 'mero_dashain_petals_v1',
};

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Petals Canvas state
  const [petalsEnabled, setPetalsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PETALS);
    return saved !== null ? saved === 'true' : true;
  });

  // Ambient Audio
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  // Global Posts from Firestore (starts with initial fallback while connecting)
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  // User's liked post IDs (persisted locally so user knows what they liked)
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIKES);
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  // Analytics State
  const [analytics, setAnalytics] = useState<SiteAnalytics>({
    totalViews: 4250,
    totalLikes: INITIAL_POSTS.reduce((acc, p) => acc + p.likesCount, 0),
    totalPosts: INITIAL_POSTS.length,
    uniqueCountries: new Set(INITIAL_POSTS.map((p) => p.country)).size,
    lastUpdated: new Date().toISOString(),
  });

  // Admin Announcement State
  const [announcement, setAnnouncement] = useState<AdminAnnouncement | null>({
    id: 'ann-current',
    title: 'Warmest Vijaya Dashami & Tihar Greetings to Nepalis Worldwide!',
    content: 'May Goddess Durga Bhavani and Mata Laxmi shower infinite blessings, unity, and radiant joy upon all diaspora families. — Platform Managed by Sushil Giri',
    active: true,
    date: new Date().toLocaleDateString(),
  });

  // Admin Login Session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Modal Controls
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Real-time Firestore Connection & Subscriptions
  useEffect(() => {
    // 1. Seed initial data to Firestore if the cloud database is brand new
    seedInitialPostsIfEmpty().catch((err) => {
      console.warn('Initial Firestore seed check:', err);
    });

    // 2. Real-time subscription to global posts collection
    const unsubscribePosts = subscribeToGlobalPosts((livePosts) => {
      if (livePosts.length > 0) {
        setPosts(livePosts);
        // Also update selected post if modal is currently open
        setSelectedPost((prev) => {
          if (!prev) return null;
          const updated = livePosts.find((p) => p.id === prev.id);
          return updated || prev;
        });
      }
    });

    // 3. Real-time subscription to admin announcement
    const unsubscribeAnnouncements = subscribeToAnnouncement((liveAnn) => {
      setAnnouncement(liveAnn);
    });

    // 4. Real-time subscription to site analytics
    const unsubscribeAnalytics = subscribeToSiteAnalytics((liveStats) => {
      setAnalytics(liveStats);
    });

    return () => {
      unsubscribePosts();
      unsubscribeAnnouncements();
      unsubscribeAnalytics();
    };
  }, []);

  // Sync Dark Mode to DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, String(darkMode));
  }, [darkMode]);

  // Sync Petals preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PETALS, String(petalsEnabled));
  }, [petalsEnabled]);

  // Sync Likes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(Array.from(likedPostIds)));
  }, [likedPostIds]);

  // Confetti / Flower shower burst
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.25 },
      colors: ['#f59e0b', '#ea580c', '#dc2626', '#fef08a', '#16a34a'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  // Toggle Like on Post (syncs to global Firestore)
  const handleToggleLike = async (postId: string) => {
    const isAlreadyLiked = likedPostIds.has(postId);
    const delta = isAlreadyLiked ? -1 : 1;

    // Optimistic local update
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (isAlreadyLiked) next.delete(postId);
      else next.add(postId);
      return next;
    });

    setPosts((current) =>
      current.map((p) => (p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount + delta) } : p))
    );

    // Save to shared Firestore database
    try {
      await togglePostLikeInFirestore(postId, delta);
    } catch (err) {
      console.warn('Could not sync like to cloud database:', err);
    }
  };

  // Open Detail View with View Counter increment
  const handleOpenDetail = (post: Post) => {
    setSelectedPost(post);
    incrementPostViewsInFirestore(post.id);
  };

  // Add Comment / Blessing to Post (syncs to global Firestore)
  const handleAddComment = async (postId: string, userName: string, country: string, text: string) => {
    const targetPost = posts.find((p) => p.id === postId);
    const existingComments = targetPost?.comments || [];

    // Optimistic local update
    const newComment = {
      id: `c-${Date.now()}`,
      userName,
      country,
      text,
      timestamp: 'Just now',
    };

    setPosts((current) =>
      current.map((p) => (p.id === postId ? { ...p, comments: [newComment, ...p.comments] } : p))
    );

    // Save to shared Firestore database
    try {
      await addCommentToPostInFirestore(postId, existingComments, { userName, country, text });
    } catch (err) {
      console.warn('Could not sync blessing to cloud database:', err);
    }
  };

  // Submit New Post from User (syncs to global Firestore)
  const handleSubmitPost = async (
    newPostData: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'viewsCount' | 'comments' | 'isApproved'>
  ) => {
    try {
      const createdId = await createGlobalPost(newPostData);
      console.log('Post published globally to Firestore with ID:', createdId);
    } catch (err) {
      console.error('Error saving post to cloud database:', err);
    }
  };

  // Admin Login
  const handleAdminLogin = (pin: string): boolean => {
    const clean = pin.trim().toLowerCase();
    if (clean === '9860' || clean === 'sushilgiri' || clean === 'sushil2026' || clean === '9860228005') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  // Admin Moderation Actions (syncs to global Firestore)
  const handleToggleApprove = async (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;
    const nextApproved = !target.isApproved;

    setPosts((current) => current.map((p) => (p.id === postId ? { ...p, isApproved: nextApproved } : p)));
    await setPostApprovalInFirestore(postId, nextApproved);
  };

  const handleToggleFeature = async (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;
    const nextFeatured = !target.isFeatured;

    setPosts((current) => current.map((p) => (p.id === postId ? { ...p, isFeatured: nextFeatured } : p)));
    await setPostFeaturedInFirestore(postId, nextFeatured);
  };

  const handleDeletePost = async (postId: string) => {
    setPosts((current) => current.filter((p) => p.id !== postId));
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
    await deletePostFromFirestore(postId);
  };

  const handleUpdateAnnouncement = async (title: string, content: string, active: boolean) => {
    await updateAnnouncementInFirestore(title, content, active);
  };

  const handleResetSeedData = async () => {
    if (window.confirm('Reset cloud database to default celebration seed entries?')) {
      await seedInitialPostsIfEmpty();
    }
  };

  return (
    <div className="relative min-h-screen bg-stone-50/60 text-stone-900 transition-colors duration-200 dark:bg-stone-950 dark:text-stone-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Background Floating Petals Canvas */}
      <PetalCanvas enabled={petalsEnabled} />

      {/* Top Bar Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        petalsEnabled={petalsEnabled}
        setPetalsEnabled={setPetalsEnabled}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onTriggerConfetti={triggerConfetti}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Festive Hero Section */}
        <FestiveHero
          totalPosts={posts.length}
          uniqueCountries={new Set(posts.map((p) => p.country)).size}
          totalLikes={posts.reduce((acc, p) => acc + p.likesCount, 0)}
          announcement={announcement}
          onOpenSubmit={() => setIsSubmitOpen(true)}
          onTriggerConfetti={triggerConfetti}
        />

        {/* Global Community Feed Section */}
        <CommunityFeed
          posts={posts}
          likedPostIds={likedPostIds}
          onToggleLike={handleToggleLike}
          onOpenDetail={handleOpenDetail}
          onOpenSubmit={() => setIsSubmitOpen(true)}
          onTriggerConfetti={triggerConfetti}
        />

        {/* Dashain & Tihar Living Traditions Guide */}
        <TraditionsGuide />

        {/* Creator & Contact Profile Section */}
        <CreatorProfile onOpenAdmin={() => setIsAdminOpen(true)} />

      </main>

      {/* Permanent Footer with Official Contacts & Branding */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onTriggerConfetti={triggerConfetti}
      />

      {/* Story Detail & Blessings Modal */}
      <StoryDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        isLiked={selectedPost ? likedPostIds.has(selectedPost.id) : false}
        onToggleLike={handleToggleLike}
        onAddComment={handleAddComment}
        onTriggerConfetti={triggerConfetti}
      />

      {/* Multi-step Public Submission Modal */}
      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmitPost={handleSubmitPost}
        onTriggerConfetti={triggerConfetti}
      />

      {/* Secret Admin Dashboard for Sushil Giri */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        posts={posts}
        analytics={analytics}
        announcement={announcement}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogin={handleAdminLogin}
        onAdminLogout={() => setIsAdminLoggedIn(false)}
        onToggleApprove={handleToggleApprove}
        onToggleFeature={handleToggleFeature}
        onDeletePost={handleDeletePost}
        onUpdateAnnouncement={handleUpdateAnnouncement}
        onResetSeedData={handleResetSeedData}
      />

    </div>
  );
}
