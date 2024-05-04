import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { mainRouter } from './src/routes/mainRouter.js';
import { modulesRoutes } from './src/routes/modulesRoutes.js';
// import cookieParser from 'cookie-parser';
import { notFoundErrorMiddleware } from './src/middlewares/errors/notFoundErrorMiddleware.js';
import { errorHandlerMiddleware } from './src/middlewares/errors/errorHandlerMiddleware.js';

// Crear el servidor
const app = express();

// Middlewares Globales
// app.use(cookieParser())
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

// Middleware Cors con la insertación de Cookies en las peticiones con el token
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173',
//   exposedHeaders: ['SET-COOKIE']
// }));

// Middleware Cors sin cookies
app.use(cors(
  {origin: true,
  credentials: true}
));


// Middleware Recursos Estaticos
app.use('/uploads', express.static('./uploads'));

// Ruta a gestion de personal/clientes/stock
app.use(mainRouter);

// Ruta gestion de Modulos
app.use(modulesRoutes);

// Middleware 404 Not Found
app.use(notFoundErrorMiddleware);

// Middleware de Gestión de Errores
app.use(errorHandlerMiddleware);

//Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});