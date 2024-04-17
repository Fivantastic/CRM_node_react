import path from 'path';
import fs from 'fs/promises';

// Creacion dela ruta y borrado
export const deleteImageUtil = async (imageDir, image) => {
  try {
    const imgPath = path.join(imageDir, image);
    await fs.rm(imgPath);
    console.log('Imagenes , files eliminados correctamente');
  } catch (error) {
    error.code = 'DELETE_IMAGE_ERROR';
    error.message = 'No se ha podido eliminar la imagen';
    throw error;
  }
};
