export function adminAuthMiddleware(req, res, next) {
    try {
        // Verifica si el usuario tiene el rol de administrador
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos de administrador.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error en la verificación de permisos de administrador.' });
    }
}
