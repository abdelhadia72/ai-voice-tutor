"use client";

import Link from "next/link";
import { Icons } from "@/lib/data/icons";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen bg-white/40">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <Icons.languages className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Practago
              </span>
            </Link>

            {/* desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                >
                  Try Demo
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <Icons.close className="h-6 w-6 text-gray-600" />
              ) : (
                <Icons.menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 px-2 bg-white/80 backdrop-blur-lg rounded-2xl my-2 border border-gray-100"
            >
              <div className="flex flex-col gap-3">
                <Link href="/dashboard" className="px-2">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    Try Demo
                  </Button>
                </Link>
                <Link href="/dashboard" className="px-2">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen pt-32 overflow-hidden bg-white/40"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(16_185_129/0.1)_0%,transparent_60%)] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgb(45_212_191/0.1)_0%,transparent_60%)] opacity-70" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                <Icons.star className="h-4 w-4" />
                AI-Powered Language Learning
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  Turn Your Voice
                </span>
                <br />
                <span className="text-gray-900">into Fluency</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the future of language learning with our AI-powered
                platform. Natural conversations, instant feedback, and
                personalized lessons.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 h-14 text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Learning Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-12 h-14 text-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Try Demo
                </Button>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative mt-8 md:mt-20"
            >
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <Icons.mic className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Voice Chat
                      </h3>
                      <p className="text-sm text-gray-600">Practice speaking</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-emerald-100 rounded-full w-3/4" />
                    <div className="h-2 bg-emerald-100 rounded-full w-1/2" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                      <Icons.brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI Tutor</h3>
                      <p className="text-sm text-gray-600">
                        Personalized lessons
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-teal-100 rounded-full w-2/3" />
                    <div className="h-2 bg-teal-100 rounded-full w-5/6" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-5, 15, -5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Icons.languages className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Translation
                      </h3>
                      <p className="text-sm text-gray-600">Instant feedback</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-cyan-100 rounded-full w-4/5" />
                    <div className="h-2 bg-cyan-100 rounded-full w-3/5" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pro Features */}
      <section className="py-20 relative overflow-hidden bg-white/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(16_185_129/0.1)_0%,transparent_60%)] opacity-70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Pro Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take your language learning to the next level
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-emerald-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Icons.mic className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Advanced Voice Features
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-emerald-500" />
                  <span>Unlimited AI conversations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-emerald-500" />
                  <span>Advanced pronunciation feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-emerald-500" />
                  <span>Real-time grammar correction</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-emerald-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <Icons.brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Premium Learning Tools
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-teal-500" />
                  <span>Personalized study plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-teal-500" />
                  <span>Progress analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.check className="h-5 w-5 text-teal-500" />
                  <span>Offline mode access</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 h-14 text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Upgrade to Pro
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it Works  */}
      <section className="py-20 relative overflow-hidden bg-white/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-emerald-600 mb-2 block">
              Simple Steps
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Practago Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start speaking a new language in minutes with our intuitive
              process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-emerald-100/20 hover:border-emerald-200/30 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.mic className="h-7 w-7 text-white" />
                </div>
                <div className="absolute top-8 right-8 text-5xl font-bold text-emerald-50">
                  01
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Record Your Voice
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Speak naturally in your target language. Our AI understands
                  context and provides real-time feedback.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-teal-100/20 hover:border-teal-200/30 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.brain className="h-7 w-7 text-white" />
                </div>
                <div className="absolute top-8 right-8 text-5xl font-bold text-teal-50">
                  02
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Get AI Feedback
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive instant corrections and suggestions to improve your
                  pronunciation and grammar.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="bg-white rounded-2xl p-8 shadow-sm relative border border-cyan-100/20 hover:border-cyan-200/30 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icons.languages className="h-7 w-7 text-white" />
                </div>
                <div className="absolute top-8 right-8 text-5xl font-bold text-cyan-50">
                  03
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Track Progress
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your improvement with detailed analytics and
                  personalized learning insights.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features  */}
      <section className="py-20 relative overflow-hidden bg-white/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(165,243,252,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-emerald-600 mb-2 block">
              Core Features
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to enhance your language learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4">
                <Icons.mic className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Voice Recognition
              </h3>
              <p className="text-gray-600">
                Advanced AI that understands your speech and provides instant
                feedback
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4">
                <Icons.brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Learning
              </h3>
              <p className="text-gray-600">
                Personalized curriculum that adapts to your learning style
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4">
                <Icons.languages className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multiple Languages
              </h3>
              <p className="text-gray-600">
                Support for various languages with native speaker quality
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-white/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgb(45_212_191/0.1)_0%,transparent_60%)] opacity-70" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of learners and start speaking a new language today
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 h-14 text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/*  Footer */}
      <footer className="py-12 relative overflow-hidden bg-white/40 border-t border-emerald-100/20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Icons.languages className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Practago
              </span>
            </div>
            <p className="text-gray-600">
              © 2024 Practago. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
