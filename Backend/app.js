import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { mainRouter } from './src/routes/mainRouter.js';
import { modulesRoutes } from './src/routes/modulesRoutes.js';
import { actionRoutes } from './src/routes/actionRoutes.js';
import { notFoundErrorMiddleware } from './src/middlewares/errors/notFoundErrorMiddleware.js';
import { errorHandlerMiddleware } from './src/middlewares/errors/errorHandlerMiddleware.js';
import http from 'http';
import configureSocket from './socket.js';
import configureNotificationRoutes from './src/routes/notificationRoutes.js';

// Crear la aplicación Express
const app = express();

// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const { emitDeliveryAssigned } = configureSocket(server);

// Middlewares Globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

// Middleware Cors sin cookies
app.use(cors({
  origin: true,
  credentials: true,
  accessControlAllowOrigin: true
}));

// Middleware Recursos Estaticos
app.use('/uploads', express.static('./uploads'));

// Ruta a gestion de personal/clientes/stock
app.use(mainRouter);

// Ruta para gestión de notificaciones
const notificationRoutes = configureNotificationRoutes(emitDeliveryAssigned);
app.use(notificationRoutes);

// Ruta gestion de Modulos
app.use(modulesRoutes);

// Ruta gestion de diversas acciones
app.use(actionRoutes);

// Middleware 404 Not Found
app.use(notFoundErrorMiddleware);

// Middleware de Gestión de Errores
app.use(errorHandlerMiddleware);

// Ponemos el servidor a escuchar
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
