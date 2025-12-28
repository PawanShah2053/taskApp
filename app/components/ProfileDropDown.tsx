"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Settings,
  X,
  AlertTriangle,
  AlertCircle,
  Music,
  Loader2,
  Check,
} from "lucide-react";
import useStore from "@/app/store/useStore";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDropdown({ isOpen }: ProfileDropdownProps) {
  const generations = useStore((state) => state.generations);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute h-auto right-0 top-full mt-2 w-[380px] bg-[#1d2125] rounded-2xl shadow-2xl border border-[#303438] overflow-hidden z-50 max-sm:w-[320px] max-sm:right-[-20px]"
          >
            {/* Profile Header */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 flex items-center gap-3 border-b border-[#303438]"
            >
              {/* Profile Picture with Gradient Border */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-[60px] h-[60px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-full p-0.5">
                  <div className="w-full h-full rounded-full bg-[#1d2125] flex items-center justify-center">
                    <span className="text-white text-xl">J</span>
                  </div>
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1">
                <h3 className="text-[#e4e6e8]">Johnny</h3>
                <p className="text-[#898c92] text-sm">@johnny</p>
              </div>

              {/* Settings Icon */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-[#262a2e] rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-[#777a80]" />
              </motion.button>
            </motion.div>

            {/* Credits Section */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-[#212529] mx-4 mt-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#e4e6e8] text-sm font-semibold">
                  120/500 credits
                </span>
                <motion.div whileHover={{ scale: 1.2 }} className="cursor-help">
                  <AlertCircle className="w-4 h-4 text-[#777a80]" />
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 text-[#777a80] hover:text-white transition-colors"
              >
                <span className="text-sm">Top Up</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Warning Alert */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mx-4 mt-3 bg-[rgba(216,156,58,0.08)] rounded-xl p-4 border border-[#d89c3a]/20"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#16191c] border border-[#303438] flex items-center justify-center"
              >
                <X className="w-3 h-3 text-[#505458]" />
              </motion.button>

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-[#d89c3a]" />
                    <span className="text-[#d89c3a] text-sm">
                      Insufficient credits
                    </span>
                  </div>
                  <p className="text-[#bfc2c8] text-sm">
                    Your credit balance: 0
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-transparent border border-[#5d6165] rounded-lg text-white text-sm hover:bg-[#262a2e] transition-colors"
                >
                  Top Up
                </motion.button>
              </div>
            </motion.div>

            {/* Recent Generations */}
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Recent Generations
              </h3>
              {generations.length === 0 ? (
                <div className="text-center py-4 text-sm text-zinc-400">
                  <Music className="w-5 h-5 mx-auto mb-2 opacity-50" />
                  No generations yet
                </div>
              ) : (
                generations.map((generation, index) => (
                  <motion.div
                    key={generation.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="relative bg-gradient-to-r from-[#16191c] via-[#1d2125] to-[#16191c] rounded-xl p-3 overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      {/* Status Icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          generation.status === "completed"
                            ? "bg-green-500/20"
                            : generation.status === "failed"
                            ? "bg-rose-500/20"
                            : "bg-blue-500/20"
                        }`}
                      >
                        {generation.status === "generating" ? (
                          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        ) : generation.status === "completed" ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : generation.status === "failed" ? (
                          <X className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Music className="w-4 h-4 text-zinc-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium text-[#e4e6e8] truncate"
                          title={generation.prompt}
                        >
                          {generation.prompt.split(" ").slice(0, 6).join(" ")}
                          {generation.prompt.split(" ").length > 6 ? "..." : ""}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span
                            className={`text-xs ${
                              generation.status === "completed"
                                ? "text-green-400"
                                : generation.status === "failed"
                                ? "text-rose-400"
                                : "text-blue-400"
                            }`}
                          >
                            {generation.status.charAt(0).toUpperCase() +
                              generation.status.slice(1)}
                            {generation.status === "generating" &&
                              ` (${generation.progress}%)`}
                          </span>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 border border-white/20 rounded-md bg-white/5">
                            v1
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {generation.status === "generating" && (
                      <div className="mt-2 h-1 bg-[#16191c] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${generation.progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
            {/* Server Status */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-4 my-4 p-3 bg-[rgba(255,59,48,0.08)] rounded-xl border border-red-500/20"
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">Oops! Server busy</span>
              </div>
              <p className="text-[#bfc2c8] text-xs">
                4.9K users in the queue.{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Retry
                </span>
              </p>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mx-4 mb-4 p-3 bg-[rgba(255,193,7,0.08)] rounded-xl border border-yellow-500/20 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center shrink-0">
                <span className="text-2xl">😥</span>
              </div>
              <div className="flex-1">
                <h4 className="text-yellow-500 text-sm mb-1">Invalid Prompt</h4>
                <p className="text-[#bfc2c8] text-xs">
                  This is not good prompt, throw invalid error. Your prompt does
                  not seem to be valid. Please provide a prompt related to song
                  making. Learn more about prompting.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
