import { Server } from 'socket.io';

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Permitir todas las conexiones
    },
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  // Función para emitir eventos de asignación de envíos
  const emitDeliveryAssigned = (driverId, deliveryId) => {
    io.emit(`deliveryAssigned-${driverId}`, { deliveryId, message: 'Tienes un nuevo envío asignado' });
  };

 

  return { io, emitDeliveryAssigned };
};

export default configureSocket;
