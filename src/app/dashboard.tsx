"use client";

import { Card } from "@/components/ui/card";
import { Icons } from "@/lib/data/icons";
import { SECTIONS_DATA } from "@/lib/data/sections";
import Link from "next/link";
import { usePaywall } from "@/hooks/use-paywall";
import { PaywallModal } from "@/components/PaywallModal";

export function QuizCard({ title, score }: { title: string; score: number }) {
  return (
    <div className="w-full px-3 py-2 rounded-lg bg-green-50 text-green-600">
      <div className="flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className="text-sm">{score}/10</span>
      </div>
    </div>
  );
}

interface CustomCardProps {
  icon: keyof typeof Icons;
  title: string;
  subtitle: string;
  color?: string;
  type: string;
  isPro?: boolean;
  aiName: string;
  profession: string;
}

function CustomCard({
  icon,
  title,
  subtitle,
  color = "blue",
  type,
  isPro = false,
}: CustomCardProps) {
  const { checkAccess, showPaywall, closePaywall } = usePaywall();
  const gradients = {
    red: "from-rose-600 to-red-600",
    orange: "from-orange-600 to-pink-600",
    amber: "from-amber-600 to-orange-600",
    yellow: "from-yellow-600 to-amber-600",
    emerald: "from-emerald-600 to-teal-600",
    teal: "from-teal-600 to-cyan-600",
    cyan: "from-cyan-600 to-blue-600",
    sky: "from-sky-600 to-indigo-600",
  };
  const Icon = Icons[icon];

  const handleClick = (e: React.MouseEvent) => {
    if (isPro) {
      e.preventDefault();
      checkAccess();
    }
  };

  return (
    <>
      {showPaywall && <PaywallModal onClose={closePaywall} />}
      <Link href={`/chat?type=${type}`} onClick={handleClick}>
        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
          <div
            className={`p-6 bg-gradient-to-br ${
              gradients[color as keyof typeof gradients]
            } text-white relative h-full`}
          >
            <div className="flex justify-between items-start">
              <Icon className="mb-4 text-white/90" />
              {isPro && (
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                  <Icons.crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-400">
                    PRO
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
            <p className="text-white/80 group-hover:translate-x-1 transition-transform">
              {subtitle}
            </p>
            <Icons.arrowRight className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Card>
      </Link>
    </>
  );
}

export default function Dashboard() {
  const { checkAccess, showPaywall, closePaywall } = usePaywall();

  const handleProClick = (e: React.MouseEvent) => {
    e.preventDefault();
    checkAccess();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          {/* Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real-time AI Chat */}
            <div onClick={handleProClick}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-violet-600">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <Icons.magic className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Real-time AI Chat
                        </h3>
                        <p className="text-blue-100 text-sm">
                          Human-like Conversations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Icons.crown className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-xs font-medium text-amber-300">
                        PRO
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2.5 text-blue-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.video className="w-4 h-4" />
                      <span>Camera Chat</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-blue-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.mic className="w-4 h-4" />
                      <span>Voice Recognition</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-blue-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.brain className="w-4 h-4" />
                      <span>Real-time AI</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-blue-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.smile className="w-4 h-4" />
                      <span>Human-like Chat</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-blue-100/80 bg-white/5 backdrop-blur-sm p-2.5 rounded-lg">
                    Experience natural conversations with AI that can see, hear,
                    and respond like a real tutor
                  </p>

                  <button className="mt-4 w-full px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                    Start Real-time Chat
                    <Icons.video className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </div>

            {/* Story Mode */}
            <Link href="/story">
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
                <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-600">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <Icons.book className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Story Mode
                        </h3>
                        <p className="text-emerald-100 text-sm">
                          Interactive Reality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Icons.crown className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-xs font-medium text-amber-300">
                        PRO
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2.5 text-emerald-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.camera className="w-4 h-4" />
                      <span>Reality Check</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-emerald-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.eye className="w-4 h-4" />
                      <span>Visual Learning</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-emerald-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.mic className="w-4 h-4" />
                      <span>Voice Input</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-emerald-100 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg text-sm">
                      <Icons.zap className="w-4 h-4" />
                      <span>Instant React</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-emerald-100/80 bg-white/5 backdrop-blur-sm p-2.5 rounded-lg">
                    Use your camera and voice to interact with AI in real-world
                    scenarios
                  </p>

                  <button className="mt-4 w-full px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                    Start Adventure
                    <Icons.camera className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Grammar Levels */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Grammar Levels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTIONS_DATA.grammarLevels.map((level) => (
                <CustomCard
                  key={level.id}
                  icon={level.icon as keyof typeof Icons}
                  title={level.title}
                  subtitle={level.subtitle}
                  color={level.color}
                  type={level.type}
                  isPro={level.isPro}
                  aiName={level.aiName}
                  profession={level.profession}
                />
              ))}
            </div>
          </div>

          {/* Real World Practice */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Real World Practice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTIONS_DATA.realWorld.map((scenario) => (
                <CustomCard
                  key={scenario.id}
                  icon={scenario.icon as keyof typeof Icons}
                  title={scenario.title}
                  subtitle={scenario.subtitle}
                  color={scenario.color}
                  type={scenario.type}
                  isPro={scenario.isPro}
                  aiName={scenario.aiName}
                  profession={scenario.profession}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPaywall && <PaywallModal onClose={closePaywall} />}
    </div>
  );
}
