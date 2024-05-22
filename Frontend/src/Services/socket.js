import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3000"; 

class SocketService {
  constructor() {
    this.socket = socketIOClient(ENDPOINT);

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket desconectado');
    });
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  off(event, callback) {
    this.socket.off(event, callback);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
}

const socketService = new SocketService();

export default socketService;
