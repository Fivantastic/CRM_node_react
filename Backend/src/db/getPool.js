import mysql from 'mysql2/promise';

import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} from '../../env.js';

let pool;

export function getDBPool() {
  try {
    if (!pool) {
        pool = mysql.createPool({
            database: MYSQL_DATABASE,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            port: MYSQL_PORT,
        });
    }
    return pool;
  } catch (error) {
    console.log(error);
    error.message = 'No se ha podido conectar con la base de datos';
    throw error;
  }
}
