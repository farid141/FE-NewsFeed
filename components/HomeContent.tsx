"use client";

import { formatTime } from "@/helper";
import { User, UserMinus, UserPlus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "./Axios/AxiosInstance";

type User = {
  id: number;
  username: string;
  following: boolean;
};

type Post = {
  id: number;
  username: string;
  userid: number;
  content: string;
  createdat: string;
};

const POSTS_PER_PAGE = 10

export default function HomeContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMoreUser, setHasMoreUser] = useState<boolean>();

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>();
  const [error, setError] = useState("");

  const [postPage, setPostPage] = useState<number>(1);
  const [hasMorePost, setHasMorePost] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  
  // Ref untuk Intersection Observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchFeed = async (scrolled: boolean=false) => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/api/feed?page=${scrolled?postPage:1}&limit=${POSTS_PER_PAGE}`,
        { withCredentials: true }
      );

      if(scrolled)
        setDisplayedPosts((prev)=> [...prev, ...res.data.data])
      else
        setDisplayedPosts(res.data.data);
      
      setHasMorePost(res.data.pagination.hasMore);
    } catch {
      setDisplayedPosts([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/users",
        { withCredentials: true }
      );
      setUsers(res.data.data);
      setHasMoreUser(res.data.pagination.hasMore);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchFeed();
    fetchUsers();
  }, []);

  // infinite scroll trigger
  useEffect(() => {
    fetchFeed(true);
  }, [postPage]);

  const handleFollow = async (userId: number, follow: boolean) => {
    try {
      follow
        ? await axios.delete(
            process.env.NEXT_PUBLIC_API_URL + "/api/follow/" + userId,
            { withCredentials: true }
          )
        : await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/api/follow/" + userId,
            {},
            { withCredentials: true }
          );

      await fetchFeed();
      await fetchUsers();
    } catch {}
  };

  const handleCreatePost = async () => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/posts",
        { content: newPost },
        { withCredentials: true }
      );

      await fetchFeed();
      setNewPost("");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.error);
    }
  };

  const lastPostCallback = useCallback((node: HTMLDivElement | null) => {
    // Cleanup observer sebelumnya
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Skip jika sedang loading
    if (isLoading) return;

    // Buat observer baru
    observerRef.current = new IntersectionObserver((entries) => {
      // entries[0] adalah element yang kita observe
      if (entries[0].isIntersecting && hasMorePost) {
        console.log('User reached last post, loading more...');
        setPostPage((prevPage) => prevPage + 1);
      }
    }, {
      // Options untuk fine-tuning
      threshold: 1.0,      // 100% element harus visible
      rootMargin: '100px'  // Trigger 100px sebelum element visible
    });

    // Attach observer ke node (last post element)
    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, hasMorePost]);

  return (
    <>
      {/* list user follow */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Suggested Users
          </h2>
          <div className="space-y-3">
            {users.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">
                      {user.username}
                    </span>
                  </div>
                  <button
                    onClick={() => handleFollow(user.id, user.following)}
                    className={`p-2 rounded-lg transition flex gap-3 align-center ${
                      user.following
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {user.following ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create Post</h2>
          <div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? (Ctrl+Enter to post)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleCreatePost}
              className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {displayedPosts.map((post, index) => {
            
            // Attach ref ke post terakhir
            const isLastPost = index === displayedPosts.length - 1;

            return (
            <div
              key={post.id}
              ref={isLastPost ? lastPostCallback : null}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  {index}={post.userid}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {post.userid}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatTime(post.createdat)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                </div>
              </div>
            </div>
          )})}

          {!hasMorePost && displayedPosts.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              No more posts to load
            </div>
          )}

          {hasMorePost && isLoading && (
            <div className="text-center py-8 text-gray-500">
              Loading ...
            </div>
          )}

          {displayedPosts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No posts yet. Be the first to post!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
