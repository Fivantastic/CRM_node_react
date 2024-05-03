import { generateAccessToken } from "../../utils/generateAccessToken.js";
// import { insertTokenCookie } from "../../utils/insertTokenCookie.js";

export const renewTokenController = async (req, res, next) => {
    try {
        // Generar un nuevo token de acceso
        const token = generateAccessToken(req.user);

        // Enviar una respuesta al cliente
        res.status(200).send({
          message: 'Token renovado exitosamente',
          token: token
      });
      } catch (error) {
        next(error);
      }
}