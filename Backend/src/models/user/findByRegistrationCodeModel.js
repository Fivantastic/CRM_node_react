import { getDBPool } from '../../db/getPool.js';
import { notFoundError } from '../../services/errorService.js';

export const findByRegistrationCodeModel = async (registration_code) => {
    const pool = await getDBPool();
    // Buscar el usuario en la base de datos.
    const [users] = await pool.query(
        `SELECT id_user, active FROM users WHERE registration_code = ?`,
        [registration_code]
    );

    // Si no se encuentra el usuario, lanzar un error.
    if (users.length === 0) {
        notFoundError('usuario');
    }

    // Si existe el usuario, comprobar si está activo.
    if (users[0].active) {
        userAlreadyActivatedError();
    }

    // Devolver el usuario.
    return users[0];
};