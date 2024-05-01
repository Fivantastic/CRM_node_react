export const checkRoleAgent = (req, res, next) => {
    try {
        const userRole = req.user.role; // El rol del usuario autenticado

        if (userRole !== 'salesAgent' && userRole !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        next(error); 
    }
}
