"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function _loginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    router.push('/home');
  };

  return (
    <>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          Register
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </>
  );
}
