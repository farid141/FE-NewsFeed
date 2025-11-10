import { MessageSquare } from 'lucide-react';
import LoginForm from "@/components/LoginForm"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Social Feed</h1>
          <p className="text-gray-600 mt-2">Connect and share with friends</p>
        </div>
        <LoginForm/>

      </div>
    </div>
  );
};