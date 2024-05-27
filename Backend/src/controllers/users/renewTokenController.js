import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
// import { insertTokenCookie } from "../../utils/insertTokenCookie.js";

export const renewTokenController = async (req, res, next) => {
    try {
      const { id_user } = req.user;

      // Obtengo la información del usuario
      const user = await selectUserByIdModel(id_user);

        // Generar un nuevo token de acceso
        const token = generateAccessToken(user);

        // Enviar una respuesta al cliente
        res.status(200).send({
          message: 'Token renovado exitosamente',
          token: token
      });
      } catch (error) {
        next(error);
      }
}