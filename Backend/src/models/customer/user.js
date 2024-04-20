import { getDBPool } from '../../db/getPool.js';

const dbPool = getDBPool();

export class User {
    static async findByEmail(email) {
        try {
            const [rows] = await dbPool.query(
                'SELECT * FROM Users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al buscar usuario por email:', error);
            throw error;
        }
    }

    static async findOne(query) {
        try {
            const [rows] = await dbPool.query(
                `SELECT * FROM Users WHERE ${query}`,
            );
            return rows[0];
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await dbPool.query(
                'SELECT * FROM Users WHERE id_user = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al buscar usuario por ID:', error);
            throw error;
        }
    }

    static async findByResetPasswordToken(token) {
        try {
            const [rows] = await dbPool.query(
                'SELECT * FROM Users WHERE reset_password_token = ?',
                [token]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al buscar usuario por token de recuperación de contraseña:', error);
            throw error;
        }
    }

    static async updateByEmail(email, updatedFields) {
        try {
            const result = await dbPool.query(
                'UPDATE Users SET ? WHERE email = ?',
                [updatedFields, email]
            );
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Error al actualizar usuario por email:', error);
            throw error;
        }
    }
}
