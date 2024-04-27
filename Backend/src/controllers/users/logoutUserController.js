export const logoutUserController = async (req, res, next) => {
    try {
        // Lógica para eliminar el token de autenticación de las cookies
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        next(error);
    }
};