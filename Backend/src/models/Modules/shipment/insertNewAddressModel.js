import { getDBPool } from '../../../db/getPool.js';

export const insertNewAddressModel = async (
  address,
  number,
  floor,
  letter_number,
  city,
  zip_code,
  country
) => {
  const pool = getDBPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  // Genero el id nuevo
  const newAddressId = crypto.randomUUID();

  addToUpdate('id_address', newAddressId);
  addToUpdate('address', address);
  addToUpdate('number', number);
  addToUpdate('floor', floor);
  addToUpdate('letter_number', letter_number);
  addToUpdate('city', city);
  addToUpdate('zip_code', zip_code);
  addToUpdate('country', country);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

  const query = `INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country) VALUES (?,?,?,?,?,?,?,?)`;
  values.push(newAddressId);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el Dirección');
    error.code = 'INSERT_ADDRESS_ERROR';
    throw error;
  }
  return newAddressId;
};
