"use client";

import { Card } from "@/components/ui/card";
import { Icons } from "@/lib/data/icons";
import { SECTIONS_DATA } from "@/lib/data/sections";

interface CustomCardProps {
  icon: keyof typeof Icons;
  title: string;
  subtitle: string;
  color?: string;
}

function CustomCard({
  icon,
  title,
  subtitle,
  color = "blue",
}: CustomCardProps) {
  const gradients = {
    red: "from-red-500 to-red-600",
    orange: "from-orange-500 to-orange-600",
    amber: "from-amber-500 to-amber-600",
    yellow: "from-yellow-500 to-yellow-600",
    emerald: "from-emerald-500 to-emerald-600",
    teal: "from-teal-500 to-teal-600",
    cyan: "from-cyan-500 to-cyan-600",
    sky: "from-sky-500 to-sky-600",
  };

  const Icon = Icons[icon];

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
      <div
        className={`p-6 bg-gradient-to-br ${gradients[color as keyof typeof gradients]} text-white relative h-full`}
      >
        <Icon className="mb-4 text-white/90" />

        <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
          {title}
        </h3>
        <p className="text-white/80 group-hover:translate-x-1 transition-transform">
          {subtitle}
        </p>
        <Icons.arrowRight className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300" />
      </div>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Improved Header */}
      <div className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Icons.user className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Ali Mo</p>
                  <p className="text-sm text-muted-foreground">
                    English Learner
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Icons.flame className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  12 Day Streak
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <Icons.settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Call */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl opacity-75" />
            <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Icons.chatbot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Live AI Chat
                  </h3>
                  <p className="text-white/80">Practice with our AI tutor</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-white/90 bg-white/5 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm sm:text-base">
                    Real-time grammar corrections
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90 bg-white/5 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm sm:text-base">
                    Natural conversations
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90 bg-white/5 p-3 rounded-lg sm:col-span-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm sm:text-base">
                    Personalized feedback & learning path
                  </span>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 font-medium">
                Start Chatting
              </button>
            </div>
          </div>

          {/* Story Mode */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-90" />
            <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icons.book className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Story Mode
                  </h3>
                  <p className="text-white/80">
                    Interactive learning adventures
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white/20 p-4 rounded-lg group transition-all duration-300 hover:bg-white/30 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    American Journey
                  </h4>
                  <p className="text-white text-sm mb-4">
                    Learn English through an exciting adventure across America
                  </p>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
                    Start Journey
                  </button>
                </div>
                <div className="flex-1 bg-white/20 p-4 rounded-lg group transition-all duration-300 hover:bg-white/30 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">
                    Business World
                  </h4>
                  <p className="text-white text-sm mb-4">
                    Master professional English in business scenarios
                  </p>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
                    Start Career
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Object.entries(SECTIONS_DATA).map(([sectionTitle, cards]) => (
          <section key={sectionTitle}>
            <h2 className="text-3xl font-bold mb-6">
              {sectionTitle.split(/(?=[A-Z])/).join(" ")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <CustomCard
                  key={card.id}
                  icon={card.icon as keyof typeof Icons}
                  title={card.title}
                  subtitle={card.subtitle}
                  color={card.color}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
