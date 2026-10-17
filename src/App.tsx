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

const STORAGE_KEYS = {
  POSTS: 'mero_dashain_posts_v1',
  LIKES: 'mero_dashain_likes_v1',
  ANALYTICS: 'mero_dashain_analytics_v1',
  ANNOUNCEMENT: 'mero_dashain_announcement_v1',
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

  // Posts State
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
  });

  // User's liked post IDs
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
  const [analytics, setAnalytics] = useState<SiteAnalytics>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          totalViews: parsed.totalViews + 1, // count this visit
        };
      } catch {
        // fallback
      }
    }
    return {
      totalViews: 3840,
      totalLikes: 1450,
      totalPosts: INITIAL_POSTS.length,
      uniqueCountries: new Set(INITIAL_POSTS.map((p) => p.country)).size,
      lastUpdated: new Date().toISOString(),
    };
  });

  // Admin Announcement State
  const [announcement, setAnnouncement] = useState<AdminAnnouncement | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'ann-1',
      title: 'Warmest Vijaya Dashami & Tihar Greetings to Nepalis Worldwide!',
      content: 'May Goddess Durga Bhavani and Mata Laxmi shower infinite blessings, unity, and radiant joy upon all diaspora families. Let us celebrate our cultural heritage together. — Sushil Giri (Platform Manager)',
      active: true,
      date: new Date().toLocaleDateString(),
    };
  });

  // Admin Login Session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Modal Controls
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  // Sync Posts to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  // Sync Likes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(Array.from(likedPostIds)));
  }, [likedPostIds]);

  // Sync Analytics
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  // Sync Announcement
  useEffect(() => {
    if (announcement) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
    }
  }, [announcement]);

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

  // Toggle Like on Post
  const handleToggleLike = (postId: string) => {
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      const isAlreadyLiked = next.has(postId);

      if (isAlreadyLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }

      // Update post likes counter
      setPosts((currentPosts) =>
        currentPosts.map((p) => {
          if (p.id === postId) {
            const updated = {
              ...p,
              likesCount: isAlreadyLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            };
            if (selectedPost && selectedPost.id === postId) {
              setSelectedPost(updated);
            }
            return updated;
          }
          return p;
        })
      );

      return next;
    });
  };

  // Open Detail View with View Counter increment
  const handleOpenDetail = (post: Post) => {
    setSelectedPost(post);
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id === post.id) {
          return { ...p, viewsCount: p.viewsCount + 1 };
        }
        return p;
      })
    );
  };

  // Add Comment / Blessing to Post
  const handleAddComment = (postId: string, userName: string, country: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      userName,
      country,
      text,
      timestamp: 'Just now',
    };

    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id === postId) {
          const updated = {
            ...p,
            comments: [newComment, ...p.comments],
          };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  // Submit New Post from User
  const handleSubmitPost = (
    newPostData: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'viewsCount' | 'comments' | 'isApproved'>
  ) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 1,
      viewsCount: 1,
      isApproved: true,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);

    // Update analytics
    setAnalytics((prev) => ({
      ...prev,
      totalPosts: prev.totalPosts + 1,
      uniqueCountries: new Set([...posts.map((p) => p.country), newPost.country]).size,
    }));
  };

  // Admin Login
  const handleAdminLogin = (pin: string): boolean => {
    // PIN 9860 or sushilgiri or sushil2026
    const clean = pin.trim().toLowerCase();
    if (clean === '9860' || clean === 'sushilgiri' || clean === 'sushil2026' || clean === '9860228005') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  // Admin Moderation Actions
  const handleToggleApprove = (postId: string) => {
    setPosts((current) =>
      current.map((p) => (p.id === postId ? { ...p, isApproved: !p.isApproved } : p))
    );
  };

  const handleToggleFeature = (postId: string) => {
    setPosts((current) =>
      current.map((p) => (p.id === postId ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((current) => current.filter((p) => p.id !== postId));
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
  };

  const handleUpdateAnnouncement = (title: string, content: string, active: boolean) => {
    setAnnouncement({
      id: `ann-${Date.now()}`,
      title,
      content,
      active,
      date: new Date().toLocaleDateString(),
    });
  };

  const handleResetSeedData = () => {
    if (window.confirm('Reset all posts to initial seed entries?')) {
      setPosts(INITIAL_POSTS);
      setLikedPostIds(new Set());
      localStorage.removeItem(STORAGE_KEYS.POSTS);
      localStorage.removeItem(STORAGE_KEYS.LIKES);
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
