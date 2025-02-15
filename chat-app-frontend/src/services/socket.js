import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3001';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['polling', 'websocket'],
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(message, userId, sessionId) {
    if (this.socket) {
      this.socket.emit('message', {
        message,
        userId,
        sessionId,
        timestamp: new Date()
      });
    } else {
      console.error('Socket is not connected');
    }
  }
}

export default new SocketService();