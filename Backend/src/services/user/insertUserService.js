import { insertUserModel } from '../../models/user/insertUserModel.js';
import { selectUserByEmailModel } from '../../models/user/selectUserByEmailModel.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';

export const insertUserService = async (id_user, name, last_name, email, hashed_password, role, registration_code) => {
  try {
    // Buscamos en la base de datos algún usuario con ese email.
    const existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser) {
      emailAlreadyRegisteredError();
    }

    // Insertamos el usuario en la base de datos.
    await insertUserModel(
        id_user,
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