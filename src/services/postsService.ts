import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  increment,
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Post, Comment, SiteAnalytics, AdminAnnouncement } from '../types';
import { INITIAL_POSTS } from '../data/seedData';

const POSTS_COLLECTION = 'posts';
const ANNOUNCEMENTS_COLLECTION = 'announcements';
const ANALYTICS_COLLECTION = 'analytics';

/**
 * Initializes Firestore with seed posts if the collection is empty.
 */
export async function seedInitialPostsIfEmpty(): Promise<void> {
  const postsRef = collection(db, POSTS_COLLECTION);
  try {
    const snapshot = await getDocs(postsRef);
    if (snapshot.empty) {
      console.log('Seeding initial community posts to global Firestore...');
      const batch = writeBatch(db);

      for (const post of INITIAL_POSTS) {
        const postDoc = doc(db, POSTS_COLLECTION, post.id);
        batch.set(postDoc, {
          ...post,
          createdAt: new Date().toISOString(),
        });
      }

      // Initialize analytics
      const analyticsDoc = doc(db, ANALYTICS_COLLECTION, 'site');
      batch.set(analyticsDoc, {
        totalViews: 4250,
        totalLikes: INITIAL_POSTS.reduce((acc, p) => acc + p.likesCount, 0),
        totalPosts: INITIAL_POSTS.length,
        uniqueCountries: new Set(INITIAL_POSTS.map(p => p.country)).size,
        lastUpdated: new Date().toISOString(),
      });

      // Initialize announcement
      const annDoc = doc(db, ANNOUNCEMENTS_COLLECTION, 'current');
      batch.set(annDoc, {
        id: 'ann-current',
        title: 'Warmest Vijaya Dashami & Tihar Greetings to Nepalis Worldwide!',
        content: 'May Goddess Durga Bhavani and Mata Laxmi shower infinite blessings, unity, and radiant joy upon all diaspora families. — Platform Managed by Sushil Giri',
        active: true,
        date: new Date().toLocaleDateString(),
      });

      await batch.commit();
      console.log('Initial seed completed successfully in Firestore.');
    } else {
      // Ensure video posts exist in Firestore so global visitors see videos immediately
      const hasVideos = snapshot.docs.some((d) => d.data().mediaType === 'video');
      if (!hasVideos) {
        console.log('Seeding featured video celebration posts to Firestore...');
        const batch = writeBatch(db);
        for (const post of INITIAL_POSTS) {
          if (post.mediaType === 'video') {
            const postDoc = doc(db, POSTS_COLLECTION, post.id);
            batch.set(
              postDoc,
              {
                ...post,
                createdAt: new Date().toISOString(),
              },
              { merge: true }
            );
          }
        }
        await batch.commit();
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, POSTS_COLLECTION);
  }
}

/**
 * Real-time subscription to all global community posts
 */
export function subscribeToGlobalPosts(
  onUpdate: (posts: Post[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const postsRef = collection(db, POSTS_COLLECTION);

  return onSnapshot(
    postsRef,
    (snapshot) => {
      const posts: Post[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        posts.push({
          id: docSnap.id,
          userName: data.userName || 'Anonymous',
          familyName: data.familyName || 'Family',
          country: data.country || 'Nepal',
          countryCode: data.countryCode || '🇳🇵',
          city: data.city || 'Kathmandu',
          category: data.category || 'dashain_tika',
          title: data.title || '',
          story: data.story || '',
          blessings: data.blessings || '',
          mediaType: data.mediaType || 'image',
          mediaUrl: data.mediaUrl || '',
          mediaAlt: data.mediaAlt || '',
          timestamp: data.timestamp || 'Recently',
          likesCount: typeof data.likesCount === 'number' ? data.likesCount : 0,
          viewsCount: typeof data.viewsCount === 'number' ? data.viewsCount : 0,
          isFeatured: Boolean(data.isFeatured),
          isApproved: data.isApproved !== false,
          comments: Array.isArray(data.comments) ? data.comments : [],
        });
      });

      onUpdate(posts);
    },
    (error) => {
      console.error('Error listening to global posts:', error);
      if (onError) onError(error);
    }
  );
}

/**
 * Creates and publishes a new post to the global Firestore database
 */
export async function createGlobalPost(
  newPost: Omit<Post, 'id' | 'timestamp' | 'likesCount' | 'viewsCount' | 'comments' | 'isApproved'>
): Promise<string> {
  const postId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const postDocRef = doc(db, POSTS_COLLECTION, postId);

  const payload: Post = {
    ...newPost,
    id: postId,
    timestamp: 'Just now',
    likesCount: 1,
    viewsCount: 1,
    isFeatured: false,
    isApproved: true,
    comments: [],
  };

  try {
    await setDoc(postDocRef, {
      ...payload,
      createdAt: new Date().toISOString(),
    });

    // Increment site totalPosts counter
    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'site');
    await updateDoc(analyticsRef, {
      totalPosts: increment(1),
      totalLikes: increment(1),
    }).catch(() => {
      // Non-blocking if analytics doc does not exist yet
    });

    return postId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${POSTS_COLLECTION}/${postId}`);
    return '';
  }
}

/**
 * Increments or decrements like count on a post
 */
export async function togglePostLikeInFirestore(postId: string, incrementBy: number): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  try {
    await updateDoc(postRef, {
      likesCount: increment(incrementBy),
    });

    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'site');
    await updateDoc(analyticsRef, {
      totalLikes: increment(incrementBy),
    }).catch(() => {});
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COLLECTION}/${postId}`);
  }
}

/**
 * Increments view count on a post
 */
export async function incrementPostViewsInFirestore(postId: string): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  try {
    await updateDoc(postRef, {
      viewsCount: increment(1),
    });

    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'site');
    await updateDoc(analyticsRef, {
      totalViews: increment(1),
    }).catch(() => {});
  } catch (error) {
    // Non-blocking for passive view counts
    console.warn('Could not increment view count in Firestore:', error);
  }
}

/**
 * Appends a blessing / comment to a post in Firestore
 */
export async function addCommentToPostInFirestore(
  postId: string,
  existingComments: Comment[],
  newComment: { userName: string; country: string; text: string }
): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const commentObj: Comment = {
    id: `c-${Date.now()}`,
    userName: newComment.userName,
    country: newComment.country,
    text: newComment.text,
    timestamp: 'Just now',
  };

  try {
    await updateDoc(postRef, {
      comments: [commentObj, ...existingComments],
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COLLECTION}/${postId}`);
  }
}

/**
 * Toggles post approval state (Admin Sushil Giri action)
 */
export async function setPostApprovalInFirestore(postId: string, isApproved: boolean): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  try {
    await updateDoc(postRef, { isApproved });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COLLECTION}/${postId}`);
  }
}

/**
 * Toggles post featured pin state (Admin Sushil Giri action)
 */
export async function setPostFeaturedInFirestore(postId: string, isFeatured: boolean): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  try {
    await updateDoc(postRef, { isFeatured });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${POSTS_COLLECTION}/${postId}`);
  }
}

/**
 * Deletes post from Firestore (Admin Sushil Giri action)
 */
export async function deletePostFromFirestore(postId: string): Promise<void> {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  try {
    await deleteDoc(postRef);

    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'site');
    await updateDoc(analyticsRef, {
      totalPosts: increment(-1),
    }).catch(() => {});
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${POSTS_COLLECTION}/${postId}`);
  }
}

/**
 * Subscribes to broadcast announcement in real-time
 */
export function subscribeToAnnouncement(
  onUpdate: (announcement: AdminAnnouncement | null) => void
): () => void {
  const annRef = doc(db, ANNOUNCEMENTS_COLLECTION, 'current');

  return onSnapshot(
    annRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          id: snapshot.id,
          title: data.title || '',
          content: data.content || '',
          active: Boolean(data.active),
          date: data.date || '',
        });
      } else {
        onUpdate(null);
      }
    },
    (error) => {
      console.warn('Could not listen to announcement:', error);
    }
  );
}

/**
 * Updates announcement banner in Firestore
 */
export async function updateAnnouncementInFirestore(
  title: string,
  content: string,
  active: boolean
): Promise<void> {
  const annRef = doc(db, ANNOUNCEMENTS_COLLECTION, 'current');
  try {
    await setDoc(annRef, {
      id: 'ann-current',
      title,
      content,
      active,
      date: new Date().toLocaleDateString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${ANNOUNCEMENTS_COLLECTION}/current`);
  }
}

/**
 * Subscribes to real-time site analytics in Firestore
 */
export function subscribeToSiteAnalytics(
  onUpdate: (analytics: SiteAnalytics) => void
): () => void {
  const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'site');

  return onSnapshot(
    analyticsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          totalViews: data.totalViews || 0,
          totalLikes: data.totalLikes || 0,
          totalPosts: data.totalPosts || 0,
          uniqueCountries: data.uniqueCountries || 0,
          lastUpdated: data.lastUpdated || new Date().toISOString(),
        });
      }
    },
    (error) => {
      console.warn('Could not listen to site analytics:', error);
    }
  );
}
