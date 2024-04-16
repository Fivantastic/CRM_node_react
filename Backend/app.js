import express from 'express';
import morgan from 'morgan';
import { PORT } from './env.js';

// Crear el servidor
const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
