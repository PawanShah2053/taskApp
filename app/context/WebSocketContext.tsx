"use client";

import React, { createContext, useContext, ReactNode } from 'react';

interface WebSocketContextType {
  // Add any WebSocket methods you want to expose
  sendMessage?: (message: Record<string, unknown> | string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({});

export function WebSocketProvider({ children }: { children: ReactNode }) {
  // In a real app, you would set up the WebSocket connection here
  // and provide methods to interact with it
  
  const value: WebSocketContextType = {
    // Initialize with empty implementation
    // In a real app, this would connect to your WebSocket server
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
