"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Loader2,
  Check,
  X,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import useStore from "@/app/store/useStore";

// Move time calculation outside the component to make it pure
const calculateTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "Just now";
};

type GenerationStatus = "idle" | "generating" | "completed" | "failed";

const getStatusIcon = (status: GenerationStatus) => {
  switch (status) {
    case "generating":
      return <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />;
    case "completed":
      return <Check className="w-3.5 h-3.5 text-green-400" />;
    case "failed":
      return <X className="w-3.5 h-3.5 text-rose-400" />;
    default:
      return <Clock className="w-3.5 h-3.5 text-yellow-400" />;
  }
};

export default function RecentGenerations() {
  const generations = useStore((state) => state.generations);
  const isGenerating = useStore((state) => state.isGenerating);

  if (generations.length === 0) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-neutral-300">
            Recent generations
          </h2>
          {isGenerating && (
            <div className="flex items-center text-xs text-blue-400">
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
              Generating...
            </div>
          )}
        </div>
        <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
          <Music className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-400">No generations yet</p>
          <p className="text-xs text-zinc-500 mt-1">
            Start creating to see your history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-300">
          Recent generations
        </h2>
        {isGenerating && (
          <div className="flex items-center text-xs text-blue-400">
            <Loader2 className="w-3 h-3 animate-spin mr-1" />
            Generating...
          </div>
        )}
      </div>

      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 -mr-2">
        <AnimatePresence>
          {generations.map((generation) => (
            <motion.div
              key={generation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, margin: 0, padding: 0, border: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Item
                id={generation.id}
                status={generation.status}
                prompt={generation.prompt}
                progress={generation.progress}
                timestamp={generation.timestamp}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Item({
  // id is kept for future use (e.g., navigation, actions)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  status,
  prompt,
  progress,
  timestamp,
}: {
  id: string;
  status: GenerationStatus;
  prompt: string;
  progress: number;
  timestamp: number;
}) {
  // Use a ref to track the interval
  const intervalRef = useRef<number | null>(null);

  // Calculate time ago directly in render
  const timeAgo = calculateTimeAgo(timestamp);

  // Set up interval for updates
  useEffect(() => {
    // Clear previous interval if it exists
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = window.setInterval(() => {
      // The component will re-render with the new time
    }, 60000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [timestamp]);

  return (
    <div className="group relative flex items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
        {getStatusIcon(status)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-200 truncate pr-2">
            {prompt.split(" ").slice(0, 4).join(" ")}...
          </p>
          <div className="flex items-center gap-2">
            {status === "completed" && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                <button
                  className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle like action
                  }}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-rose-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle dislike action
                  }}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <span className="text-[10px] font-medium px-1.5 py-0.5 border border-white/20 rounded-md bg-white/5">
              v1
            </span>
            <span className="text-xs text-zinc-500 whitespace-nowrap">
              {timeAgo}
            </span>
          </div>
        </div>

        <div className="mt-1">
          {status === "generating" && (
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
          {/* {status === "completed" && (
            <p className="text-xs text-green-400 text-center">Generation complete</p>
          )}
          {status === "failed" && (
            <p className="text-xs text-rose-400 text-center">Generation failed</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
