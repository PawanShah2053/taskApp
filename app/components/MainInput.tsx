"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Mic,
  Sliders,
  AudioWaveform,
  Loader2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import useStore from "@/app/store/useStore";
import { webSocketService } from "@/app/services/websocket";

const PROMPT_PLACEHOLDERS = [
  "A dreamy synthwave track with ethereal vocals",
  "Upbeat lo-fi hip hop beat with smooth jazz influences",
  "Epic orchestral piece with choir and heavy percussion",
  "Chill electronic beats with ambient textures",
];

function IconButton({
  icon,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors ${
        disabled
          ? "text-zinc-600 cursor-not-allowed"
          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
      }`}
    >
      {icon}
    </button>
  );
}

export function MainInput() {
  const [prompt, setPrompt] = useState("");
  // Removed unused isFocused state as it's not currently being used
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const { addGeneration, updateGeneration, isGenerating } = useStore();

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % PROMPT_PLACEHOLDERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    // Add new generation to store
    const generationId = addGeneration(prompt);

    // Simulate WebSocket connection and progress updates
    const cleanup = webSocketService.subscribeToGenerationUpdates(
      generationId,
      {
        onProgress: (progress) => {
          updateGeneration(generationId, { progress });
        },
        onComplete: (audioUrl) => {
          updateGeneration(generationId, {
            status: "completed",
            progress: 100,
            audioUrl,
          });
        },
        onError: (error) => {
          updateGeneration(generationId, {
            status: "failed",
            error: error || "Failed to generate music",
          });
        },
      }
    );

    // Reset input
    setPrompt("");

    return () => cleanup();
  };

  return (
    <div className="w-full max-w-3xl px-4">
      <form onSubmit={handleSubmit}>
        <div className="relative group p-[2px] rounded-[30px] overflow-hidden">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#ff00ff_50%,transparent_60%,transparent_100%)] opacity-90 blur-[2px]"
            animate={{
              rotate: 360,
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />

          <div className="absolute inset-0 bg-magenta-500/20 blur-[80px] animate-pulse z-0" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-magenta-500/40 blur-[40px] animate-pulse z-0" />

          <div className="relative bg-[#0d0e11] border border-white/10 rounded-[28px] p-1.5 flex flex-col gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10">
            <div className="relative px-5 pt-5 pb-2">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  // Focus handlers can be added back when needed
                  className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder:text-transparent resize-none h-12 text-lg relative z-10"
                  disabled={isGenerating}
                />
                <AnimatePresence>
                  {!prompt && (
                    <motion.span
                      ref={placeholderRef}
                      key={`placeholder-${currentPlaceholder}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full flex items-center pointer-events-none text-zinc-500 text-lg"
                    >
                      {PROMPT_PLACEHOLDERS[currentPlaceholder]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-2">
                <IconButton
                  icon={<Mic className="w-5 h-5" />}
                  disabled={isGenerating}
                />
                <IconButton
                  icon={<Sliders className="w-5 h-5" />}
                  disabled={isGenerating}
                />
                <IconButton
                  icon={<AudioWaveform className="w-5 h-5" />}
                  disabled={isGenerating}
                />

                <button
                  type="button"
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-full text-zinc-400 hover:text-zinc-100 transition-all text-sm font-medium ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lyrics</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-zinc-100 transition-all text-sm font-medium border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isGenerating}
                >
                  Tools
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  className={`p-2.5 rounded-full transition-all shadow-lg border ${
                    isGenerating
                      ? "bg-zinc-800 border-zinc-700 text-zinc-600"
                      : "  border-white/20 hover:from-purple-500 hover:to-pink-500 text-white border-transparent"
                  }`}
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
