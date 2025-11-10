"use client";

import axios from "@/components/Axios/AxiosInstance";
import { useAuth } from "@/contexts/AuthContexts";
import { LogOut, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function layout({
  children,
}: {
  children: React.ReactNode
}){
  const { user } = useAuth();
  const router = useRouter();

  const onLogout = async()=>{
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/logout",
        {},
        { withCredentials: true }
      );
      router.push('/');
    } catch {
    }
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Social Feed</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
