"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProfilePopup } from "./ProfilePopup";
import useStore from "@/app/store/useStore";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const inProgressCount = useStore(
    (state) =>
      state.generations.filter(
        (gen) =>
          gen.status === "generating" ||
          (gen as unknown as { status: string }).status === "starting"
      ).length
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="absolute top-4 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-purple-500 to-pink-500 shadow-md focus:outline-none transition-transform hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-full p-0.5">
          <div className="w-full h-full rounded-full bg-[#0d0e11] flex items-center justify-center">
            <span className="text-white text-xl font-medium">J</span>
          </div>
        </div>

        {inProgressCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-[10px] font-semibold text-white ring-2 ring-black animate-pulse">
            {inProgressCount}
            <span className="sr-only">
              {inProgressCount === 1
                ? "1 in-progress generation"
                : `${inProgressCount} in-progress generations`}
            </span>
          </span>
        )}
      </button>

      <ProfilePopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
