"use client";

import { formatTime } from "@/helper";
import {
  Heart,
  LogOut,
  MessageSquare,
  User,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

type User = {
  id: number;
  username: string;
  following: boolean;
};

type Post = {
  id: number;
  username: string;
  content: string;
  createdat: string;
};

export default function HomeContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>();
  const [hasMore, setHasMore] = useState<string>();

  const handleFollow = async (userId: number) => {};
  const handleCreatePost = async () => {};
  return (
    <>
      {/* Sidebar - Users to Follow */}
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
                    onClick={() => handleFollow(user.id)}
                    className={`p-2 rounded-lg transition ${
                      user.following
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {user.following ? (
                      <UserMinus className="w-4 h-4" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
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
          {displayedPosts.map((post, index) => (
            <div
              key={post.id}
              //   ref={index === displayedPosts.length - 1 ? lastPostRef : null}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  {post.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {post.username}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatTime(post.createdat)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                </div>
              </div>
            </div>
          ))}

          {!hasMore && displayedPosts.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              No more posts to load
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
