import { selectUserByEmailModel } from '../../models/user/selectUserByEmailModel.js';
import { selectUserByIdModel } from '../../models/user/selectUserByIdModel.js';
import { updateUserModel } from '../../models/user/updateUserModel.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';

export const updateUserService = async (userId, body) => {
  const { name, last_name, email, phone, bio } = body;

  // Comprobar si el email ya existe.
  const existUser = await selectUserByEmailModel(email);
  if (existUser && existUser.id !== userId) {
    emailAlreadyRegisteredError();
  }

  // Actualizar el usuario en la base de datos.
  await updateUserModel(userId, name, last_name, email, phone, bio);

  // Obtener el usuario actualizado.
  const user = await selectUserByIdModel(userId);

  // Devolver el usuario actualizado.
  return user; // Devolver el nombre de la imagen.
};
