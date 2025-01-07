"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Backpack,
  Lock,
  Plane,
  Hotel,
  Coffee,
  Car,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  description: string;
  progress: number;
  isActive: boolean;
}

interface Episode {
  id: number;
  title: string;
  description: string;
  location: string;
  icon: React.ReactNode;
  isOpen: boolean;
  type: string;
  isLocked: boolean;
  color: string;
}

export default function Page() {
  const router = useRouter();
  const [currentLevel] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [stories] = useState<Story[]>([
    {
      id: 1,
      title: "Travel to USA",
      description: "Experience the American culture and lifestyle",
      progress: 25,
      isActive: true,
    },
    {
      id: 2,
      title: "Japanese Adventure",
      description: "Explore the land of the rising sun",
      progress: 0,
      isActive: false,
    },
  ]);

  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: 1,
      title: "Airport Arrival",
      description:
        "Start your journey at the international airport terminal, where our store representative will greet you.",
      location: "Terminal 3, International Arrivals",
      icon: <Plane />,
      isOpen: true,
      type: "airport",
      isLocked: false,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Hotel Check-in",
      description:
        "Experience luxury accommodation at our partner five-star hotel.",
      location: "Grand Plaza Hotel",
      icon: <Hotel />,
      isOpen: false,
      type: "hotel",
      isLocked: true,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      title: "Welcome Breakfast",
      description:
        "Enjoy a complimentary breakfast while reviewing your itinerary.",
      location: "Hotel Restaurant",
      icon: <Coffee />,
      isOpen: false,
      type: "breakfast",
      isLocked: true,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 4,
      title: "City Tour",
      description: "Explore the city highlights with our professional guide.",
      location: "Downtown Area",
      icon: <Car />,
      isOpen: false,
      type: "citytour",
      isLocked: true,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      title: "Shopping Experience",
      description: "Visit exclusive boutiques and shopping districts.",
      location: "Fashion District",
      icon: <ShoppingBag />,
      isOpen: false,
      type: "shopping",
      isLocked: true,
      color: "bg-rose-100 text-rose-600",
    },
  ]);

  const handleEpisodeClick = (episode: Episode) => {
    if (episode.isLocked) {
      router.push(`/chat/${episode.type}`);
    } else {
      setEpisodes(
        episodes.map((ep) =>
          ep.id === episode.id ? { ...ep, isOpen: !ep.isOpen } : ep,
        ),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1">
        <div className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Display Tag */}
            <div className="flex items-center justify-center gap-3 py-10">
              <Backpack className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-gray-900 tracking-wide">
                American Journey
              </span>
            </div>

            {/* Episodes */}
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className={`border-2 ${episode.isLocked ? "border-gray-100" : episode.color.replace("bg-", "border-").replace("100", "500")} rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]`}
                >
                  <Link href={`/real-time?type=${episode.type}`}>
                    <button
                      // onClick={() => handleEpisodeClick(episode)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${episode.isLocked ? "bg-gray-100" : episode.color}`}
                        >
                          {episode.isLocked ? (
                            <Lock className="w-6 h-6 text-gray-400" />
                          ) : (
                            <div className="w-6 h-6">{episode.icon}</div>
                          )}
                        </div>
                        <div className="text-left">
                          <h3
                            className={`font-semibold ${episode.isLocked ? "text-gray-400" : "text-gray-900"}`}
                          >
                            {episode.title}
                          </h3>
                          <div
                            className={`flex items-center text-sm ${episode.isLocked ? "text-gray-400" : "text-gray-500"}`}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            {episode.location}
                          </div>
                        </div>
                      </div>
                      {!episode.isLocked && (
                        <div className={episode.color}>
                          {episode.isOpen ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </button>
                  </Link>

                  {episode.isOpen && !episode.isLocked && (
                    <div className="p-4 border-t-2 border-dashed border-current bg-white/50">
                      <p className="text-gray-600">{episode.description}</p>
                      <Link href={`/real-time?type=${episode.type}`}>
                        <button
                          // onClick={() => router.push(`/chat/${episode.type}`)}
                          className={`mt-4 px-6 py-3 ${episode.color.replace("bg-", "bg-").replace("100", "500")} text-white rounded-lg transition-colors hover:opacity-90`}
                        >
                          Start Conversation
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
