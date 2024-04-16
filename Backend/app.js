import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import { PORT } from './env.js';

// Crear el servidor
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

//Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
