import mysql from 'mysql2/promise';

import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} from '../../env.js';

let pool;

export async function getPool() {
  try {
    if (!pool) {
      // Pool temporal para evitar error en caso de que no exista
      const poolTemp = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        port: MYSQL_PORT,
        password: MYSQL_PASSWORD,
      });
      await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        port: MYSQL_PORT,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        //  UTC (Tiempo universal coordinado), para consistencia en los datos
        timezone: 'Z',
      });
    }
    return pool;
  } catch (error) {
    console.error(error);
  }
}
