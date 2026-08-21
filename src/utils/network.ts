import type { GameRoom, NetworkMessage } from '../types/game';

class NetworkManager {
  private channel: BroadcastChannel | null = null;
  private currentRoomCode: string | null = null;
  private messageHandlers: ((msg: NetworkMessage) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('rajarani_game_channel');
      this.channel.onmessage = (event) => {
        const msg = event.data as NetworkMessage;
        if (!this.currentRoomCode || msg.roomCode === this.currentRoomCode) {
          this.messageHandlers.forEach((handler) => handler(msg));
        }
      };
    }
  }

  public setRoom(roomCode: string) {
    this.currentRoomCode = roomCode;
  }

  public subscribe(handler: (msg: NetworkMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  public broadcast(type: NetworkMessage['type'], senderId: string, payload?: any) {
    if (!this.currentRoomCode) return;
    const msg: NetworkMessage = {
      type,
      roomCode: this.currentRoomCode,
      senderId,
      payload,
      timestamp: Date.now(),
    };

    // Broadcast across tabs
    if (this.channel) {
      try {
        this.channel.postMessage(msg);
      } catch (err) {
        console.warn('Broadcast channel post failed', err);
      }
    }

    // Also persist in local storage for fallback
    try {
      localStorage.setItem(`rajarani_room_${this.currentRoomCode}`, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }

  public loadSavedRoom(roomCode: string): GameRoom | null {
    try {
      const data = localStorage.getItem(`rajarani_room_${roomCode}`);
      if (data) {
        return JSON.parse(data) as GameRoom;
      }
    } catch {
      return null;
    }
    return null;
  }
}

export const network = new NetworkManager();
