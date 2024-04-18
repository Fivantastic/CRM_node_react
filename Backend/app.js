import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { customerRouter } from './src/routes/customerRoutes.js';

// Crear el servidor
const app = express();

// Middlewares Globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));
app.use(cors());

// Meddleware Recursos Estaticos
app.use('/uploads', express.static('./uploads'));

// Ruta crear un cliente
app.use(customerRouter);

// Middleware 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de Gestión de Errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

//Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
