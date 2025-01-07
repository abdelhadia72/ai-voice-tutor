import Link from "next/link";
import { CHAT_PROMPTS } from "@/config/prompts";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(CHAT_PROMPTS).map(([key, value]) => (
            <Link
              key={key}
              href={`/chat?type=${key}`}
              className="p-4 bg-red-400"
            >
              <h2 className="text-xl font-semibold mb-2">{value.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
