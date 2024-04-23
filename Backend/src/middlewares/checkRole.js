export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // El rol del usuario autenticado
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Acceso denegado' });
      }
      
      next(); // Si el rol es permitido, continuar
    };
  };
  