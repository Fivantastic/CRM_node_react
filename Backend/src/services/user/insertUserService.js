import { getMaxReference3Digits } from '../../models/getMaxReference.js';
import { insertUserModel } from '../../models/user/insertUserModel.js';
import { selectUserByEmailModel } from '../../models/user/selectUserByEmailModel.js';
import { generateReference3DigitsFromRef } from '../../utils/generateReference3Digits.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';

export const insertUserService = async (id_user, name, last_name, email, hashed_password, role, registration_code) => {
  try {
    // Buscamos en la base de datos algún usuario con ese email.
    const existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser) {
      emailAlreadyRegisteredError();
    }

        // Obtenemos la referencia máxima de la tabla Customers
        const maxRef = await getMaxReference3Digits('Users', 'ref_US');

        // Generamos la nueva referencia de Customers
        const ref = generateReference3DigitsFromRef('US', 'U', maxRef);
    


    // Insertamos el usuario en la base de datos.
    await insertUserModel(
        id_user,
        ref,
        name,
        last_name,
        email,
        hashed_password,
        role,
        registration_code
    );

  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};