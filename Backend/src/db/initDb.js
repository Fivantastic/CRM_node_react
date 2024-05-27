import { createConnection } from "mysql2/promise.js";
import { createDBSchema } from "./createDbSchema.js";

import { createUploadsPathUtil } from '../utils/createUploadsPathUtil.js';
import { deleteUploadsPathUtil } from '../utils/deleteUploadsPathUtil.js';

import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } from '../../env.js';
// import { loadDemoData } from "./loadDemoData.js";
import { loadMinusData } from "./loadShuttleDemo.js";

const db = await createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

// Crear la base de datos
await createDBSchema(db);

// Cargamos los datos de prueba
// await loadDemoData(db);

await loadMinusData(db);

// Borramos el directorio uploads y todo su contenido
await deleteUploadsPathUtil();
console.log('Directorio de subida borrado 💣');

// Crear el directorio uploads y sus subdirectorios imagenes y files
await createUploadsPathUtil();
console.log('-> Directorios de subida creados ✅');

console.log('Todo ha ido bien 🎉');

await db.end();
process.exit(0);
