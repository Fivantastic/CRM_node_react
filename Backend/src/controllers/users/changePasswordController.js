import bcrypt from 'bcrypt';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { changePasswordSchema } from '../../schemas/changePasswordSchema.js';
import { selectUserByIdModel } from '../../models/user/selectUserByIdModel.js';
import { updatePasswordModel } from '../../models/user/updatePasswordModel.js';
import { success } from '../../utils/success.js';
import { invalidCredentials } from '../../services/errorService.js';

export const changePasswordController = async (req, res, next) => {
  try {
    const userId = req.params.id_user; // Obtenido del middleware de autenticación
    const { currentPassword, newPassword } = req.body;
    // Validar el esquema del cuerpo de la solicitud
    await validateSchemaUtil(changePasswordSchema, req.body);

    // Obtener usuario por ID
    const user = await selectUserByIdModel(userId);

    if (!user) throw invalidCredentials('Usuario no encontrado');

    // Verificar si la contraseña actual es correcta
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword)
      throw invalidCredentials('Contraseña actual incorrecta');

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Actualizar la contraseña en la base de datos
    await updatePasswordModel(userId, hashedPassword);

    // Responder con éxito
    res.json(success({ message: 'Contraseña cambiada con éxito' }));
  } catch (error) {
    next(error); // Manejo de errores
  }
};
