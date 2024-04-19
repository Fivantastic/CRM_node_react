import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { customerRouter } from './src/routes/customerRoutes.js';
import { authRouter } from './src/routes/authRoutes.js';
import { userRouter } from './src/routes/userRoutes.js';
import recoverPassword from './src/routes/recover-password.js';

// Crear el servidor
const app = express();

// Middlewares Globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));
app.use(cors());

// Middleware Recursos Estaticos
app.use('/uploads', express.static('./uploads'));

// Ruta crear un cliente
app.use(customerRouter);

// Rutas de usuarios
app.use(userRouter);

// Ruta login de un usuario
app.use(authRouter);

// Rutas para recuperación de contraseña
app.use(recoverPassword); 

// Middleware 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de Gestión de Errores
app.use((err, req, res, next) => {
  if (err.statusCode) {
    // Si el error tiene una propiedad statusCode, se trata de un error específico
    const errorResponse = {
      statusCode: err.statusCode,
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message || 'Unknown error occurred',
    };
    res.status(err.statusCode).json(errorResponse);
  } else {
    // Si no, se trata de un error general del servidor
    console.error(err.stack || "Error desconocido");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
