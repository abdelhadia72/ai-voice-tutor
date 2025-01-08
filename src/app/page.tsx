"use client";

import Link from "next/link";
import { Icons } from "@/lib/data/icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* nav */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                <Icons.languages className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                Practago
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
             
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  Try Demo
                </Button>
              </Link>
              <Link href="/chat">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <Icons.close className="h-6 w-6 text-gray-600" />
              ) : (
                <Icons.menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* mobile nav */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-teal-600 px-2 py-1"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-teal-600 px-2 py-1"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-teal-600 px-2 py-1"
                >
                  About
                </Link>
                <Link href="/chat">
                  <Button
                    variant="outline"
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                  >
                    Try Demo
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.1)_1px,transparent_0)] [background-size:40px_40px] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 leading-tight">
                Master Any Language with Practago
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Experience personalized language learning with advanced AI
                tutors. Real-time conversations, interactive stories, and
                immersive practice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-14 text-lg"
                >
                  Start Learning Now
                </Button>
              </Link>
              <Link href="/story">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 h-14 text-lg"
                >
                  Try Demo
                </Button>
              </Link>
            </motion.div>

            
          </div>

          {/* feature cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-teal-500/5 hover:shadow-teal-500/10 transition-all duration-300 border border-gray-100"
            >
              <div className="h-12 w-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.mic className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time AI Conversations
              </h3>
              <p className="text-gray-600">
                Practice speaking with our AI tutors that understand context and
                provide instant feedback.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300 border border-gray-100"
            >
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Stories
              </h3>
              <p className="text-gray-600">
                Learn through immersive story-based scenarios that adapt to your
                level and interests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300 border border-gray-100"
            >
              <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.languages className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Translation
              </h3>
              <p className="text-gray-600">
                Get real-time translations and explanations in your native
                language.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* how it works*/}
      <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform adapts to your learning style and pace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.user className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Set your language goals and preferences
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Assessment</h3>
              <p className="text-gray-600">
                Get your personalized learning path
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.mic className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Practice Speaking</h3>
              <p className="text-gray-600">
                Engage in real conversations with AI
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.magic className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">See your improvement over time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unlock advanced features to accelerate your learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Premium Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <Icons.crown className="h-8 w-8" />
                <h3 className="text-2xl font-semibold">
                  Unlimited AI Conversations
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>24/7 access to AI language tutors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>Advanced grammar correction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>Pronunciation feedback</span>
                </li>
              </ul>
            </motion.div>

            {/* Premium Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-br from-purple-500 to-rose-500 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <Icons.magic className="h-8 w-8" />
                <h3 className="text-2xl font-semibold">Interactive Stories</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>Immersive learning scenarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>Real-world conversation practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="h-5 w-5" />
                  <span>Cultural insights and context</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-zinc-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Start Your Language Journey Today
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already mastering new languages
              with AI
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-12 h-14 text-lg"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/story"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedback"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-600 hover:text-teal-600"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  <Icons.languages className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                  Practago
                </span>
              </div>
              <p className="text-gray-600">
                © 2024 Practago. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
