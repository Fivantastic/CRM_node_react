import fs from 'fs/promises';
import path from 'path';
import { UPLOADS_DIR } from '../../env.js';

export const createUploadsPathUtil = async () => {
  const rootDir = process.cwd();
  const uploadsDir = path.join(rootDir, `${UPLOADS_DIR}`);
  const imageDir = path.join(uploadsDir, 'image');
  const fileDir = path.join(uploadsDir, 'files');

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log('-> Directorio uploads creado correctamente ✅');

    await fs.mkdir(imageDir, { recursive: true });
    console.log('-> Directorio image creado correctamente ✅');

    await fs.mkdir(fileDir, { recursive: true });
    console.log('-> Directorio files creado correctamente ✅');

  } catch (error) {
    error.code = 'CREATE_UPLOADS_STRUCTURE_PATH_ERROR';
    error.message =
      'No se ha podido crear la estructura de directorios de uploads';
    throw error;
  }
};
