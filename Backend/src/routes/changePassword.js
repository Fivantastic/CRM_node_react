import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { User } from '../models/customer/user.js';

const router = express.Router();

// Endpoint para cambio de contraseña
router.post('/change-password', authenticateUser, [
    check('currentPassword', 'La contraseña actual es requerida').notEmpty(),
    check('newPassword', 'La nueva contraseña debe tener al menos 8 caracteres').isLength({ min: 8 })
], async (req, res) => {
    console.log('Solicitud de cambio de contraseña recibida'); // Log para confirmar que el endpoint es llamado

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array()); // Log de errores de validación
        return res.status(400).json({ errors: errors.array() });
    }

    console.log('Token recibido:', req.headers.authorization); // Verificar el token recibido

    const { currentPassword, newPassword } = req.body;
    const user = req.user; // Usuario decodificado por el middleware de autenticación

    if (!user) {
        console.log('Usuario decodificado no encontrado'); // El middleware no logró decodificar el token
        return res.status(401).json({ msg: 'Token de autentificación inválido' });
    }

    console.log('Usuario decodificado:', user); // Verificar la información decodificada

    try {
        const existingUser = await User.findById(user.id_user); // Usar el ID para buscar al usuario
        if (!existingUser) {
            console.log('Usuario no encontrado:', user.id_user); // Log si el ID no coincide
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar que la contraseña actual es correcta
        const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isMatch) {
            console.log('Contraseña incorrecta'); // Log cuando la contraseña no coincide
            return res.status(401).json({ msg: 'La contraseña actual no es correcta' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Actualizar la contraseña
        const updateResult = await User.updateByEmail(existingUser.email, { password: hashedPassword });
        if (!updateResult) {
            console.log('Error al actualizar la contraseña'); // Log si la actualización falla
            return res.status(500).json({ msg: 'Error al actualizar la contraseña' });
        }

        console.log('Contraseña actualizada con éxito'); // Log para confirmar éxito
        res.json({ msg: 'Contraseña actualizada con éxito' }); // Respuesta exitosa
    } catch (err) {
        console.error('Error del servidor:', err.message); // Log de errores del servidor
        return res.status(500).json({ msg: 'Error del servidor' });
    }
});

export default router;
