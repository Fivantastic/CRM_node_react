import { updateUserAvatarSchema } from '../../schemas/user/updateUserAvatarSchema.js';
import { updateAvatarUserService } from '../../services/user/updateAvatarUserService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const updateUserAvatarController = async (req, res, next) => {
  try {
    // Validar el body con Joi. Si files no existe devolvemos un objeto vacío.
    await validateSchemaUtil(updateUserAvatarSchema, req.files || {});
    console.log(req.files);

    // Obtenemos el id del usuario.
    const userId = req.user.id_user || req.params.id_user;

    // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho de 100 píxeles.
    const avatarName = await updateAvatarUserService(
      userId,
      req.files.avatar,
      100
    );

    // Devolvemos el nombre del avatar.
    res.send({
      status: 'ok',
      message: 'Avatar actualizado',
      data: {
        avatar: avatarName,
      },
    });
  } catch (error) {
    next(error);
  }
};
