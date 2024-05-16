import { getDBPool } from '../db/getPool.js';

export const getMaxReference3Digits = async (tableName, refField) => {
  const pool = await getDBPool();
  const query = `SELECT ${refField} FROM ${tableName} ORDER BY ${refField} DESC LIMIT 1`;
  const [result] = await pool.query(query);
  return result.length > 0 ? result[0][refField] : null;
}

export const getMaxReference5Digits = async (tableName, refField) => {
  const pool = await getDBPool();
  const query = `SELECT ${refField} FROM ${tableName} ORDER BY ${refField} DESC LIMIT 1`;
  const [result] = await pool.query(query);
  return result.length > 0 ? result[0][refField] : null;
}