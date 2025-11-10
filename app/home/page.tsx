import HomeContent from "@/components/HomeContent";

export default function Dashboard() {
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <HomeContent />
        </div>
      </div>
    </div>
  );
};
