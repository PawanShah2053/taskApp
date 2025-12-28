import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';

class WebSocketService {
  private socket: Socket | null = null;
  
  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
    }
    return this.socket;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  // Simulate generation progress
  simulateGeneration(generationId: string, onProgress: (progress: number) => void, onComplete: () => void) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(progress);
        onComplete();
      } else {
        onProgress(progress);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }
  
  // In a real app, these would be actual WebSocket events
  subscribeToGenerationUpdates(generationId: string, callbacks: {
    onProgress?: (progress: number) => void;
    onComplete?: (audioUrl: string) => void;
    onError?: (error: string) => void;
  }) {
    // In a real implementation, we would set up WebSocket listeners here
    // For simulation, we'll use the simulateGeneration method
    return this.simulateGeneration(
      generationId,
      (progress) => callbacks.onProgress?.(progress),
      () => {
        callbacks.onComplete?.(`/api/audio/generated-${generationId}.mp3`);
      }
    );
  }
}

export const webSocketService = new WebSocketService();
