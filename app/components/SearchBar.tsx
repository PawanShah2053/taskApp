"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTimeout(() => {
          inputRef.current?.focus();
          if ((inputRef.current?.value || "").trim() !== "") {
          }
        }, 0);
      } else if (e.key === "Escape") {
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center gap-3 rounded-full bg-neutral-900/50 px-3 py-2 text-sm text-neutral-300 w-full relative">
        <div
          className="flex items-center gap-2 text-neutral-400"
          onClick={() => inputRef.current?.focus()}
          role="button"
        >
          <Search size={14} />
          <span className="text-sm">Search</span>
        </div>

        <div className="flex items-center flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
            }}
            placeholder=""
            className="bg-transparent focus:outline-none flex-1 pr-10 text-sm text-neutral-300"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex items-center  bg-neutral-900/30 px-2 py-0.5 text-xs text-neutral-300 z-10"
          aria-label="Open search (⌘K)"
        >
          ⌘K
        </button>
      </div>
    </div>
  );
}
