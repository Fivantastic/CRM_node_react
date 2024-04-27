import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { insertTokenCookie } from "../../utils/insertTokenCookie.js";

export const renewTokenController = async (req, res, next) => {
    try {
        // El usuario está autenticado y el token de acceso es válido
        // Generar un nuevo token de acceso
        const accessToken = generateAccessToken(req.user);
        
        // Configurar la cookie del nuevo token
        insertTokenCookie(res, accessToken);
        
        // Enviar una respuesta al cliente
        res.json({ status: 'success', message: 'Token renovado correctamente' });
      } catch (error) {
        // Manejar cualquier error que ocurra
        res.status(500).json({ error: 'Ha ocurrido un error al renovar el token' });
      }
}