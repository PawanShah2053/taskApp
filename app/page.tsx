"use client";

import { useEffect } from "react";
import { WebSocketProvider } from "@/app/context/WebSocketContext";
import useStore from "@/app/store/useStore";
import RecentGenerations from "./components/RecentGenerations";
import Sidebar from "./components/Sidebar";
import ProfileMenu from "./components/ProfileMenu";
import { MainInput } from "./components/MainInput";

// WebSocket connection component
function WebSocketManager() {
  const { addGeneration, updateGeneration } = useStore();

  useEffect(() => {
    // In a real app, you would connect to your WebSocket server here

    return () => {
      // Cleanup WebSocket connection on unmount
    };
  }, [addGeneration, updateGeneration]);

  return null;
}

export default function HomePage() {
  return (
    <WebSocketProvider>
      <WebSocketManager />
      <main className="relative flex h-screen w-screen overflow-hidden bg-[#0d0e11] text-white">
        <ProfileMenu />
        <Sidebar />

        <section className="relative flex flex-1 flex-col items-center overflow-y-auto py-8">
          <div className="w-full max-w-3xl px-6 mt-20">
            <div className="flex flex-col items-center gap-10">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                What Song to Create?
              </h1>

              <div className="w-full">
                <MainInput />
                <div className="mt-3 text-center">
                  <p className="text-sm text-zinc-400">
                    MusicGPT v6 Pro - Our latest AI audio model{" "}
                    <button className="text-gray-500 hover:text-purple-300 transition-colors underline">
                      Example prompts
                    </button>
                  </p>
                </div>
              </div>

              <div className="w-full mt-8">
                <RecentGenerations />
              </div>
            </div>
          </div>
        </section>
      </main>
    </WebSocketProvider>
  );
}
