import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:3001', {
        withCredentials: true,
        transports: ['polling', 'websocket'],
        autoConnect: true
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