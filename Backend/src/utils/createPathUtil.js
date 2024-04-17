import fs from 'fs/promises';

// Creamos la ruta si no existe
export const createPathIfNotExistsUtil = async (filePath) => {
  try {
    await fs.access(filePath);
    console.log(`La ruta ${filePath} ya existe.`);
  } catch (error) {
    try {
      await fs.mkdir(filePath, { recursive: true });
      console.log(`La ruta ${filePath} ha sido creada`);
    } catch (error) {
      console.log(error);
      error.message = 'No se ha podido crear el directorio';
      throw error;
    }
  }
};
